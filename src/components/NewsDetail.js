import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTelegram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { API_DOMAIN, Facebook, getNewsDetail, getRecommendedNews, Instagram, Telegram, X, Youtube } from './config'; // Adjust path as necessary

const NewsDetailPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendedNews, setRecommendedNews] = useState([]);
    const [recLoading, setRecLoading] = useState(true);
    const [recError, setRecError] = useState(null);
    const prevIdRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const newsDetail = await getNewsDetail(id);
                setNews(newsDetail);
                setLoading(false);

                setRecLoading(true);
                const recommendedNews = await getRecommendedNews(id);
                setRecommendedNews(recommendedNews);
                setRecLoading(false);

                prevIdRef.current = id;
            } catch (error) {
                setError(error.message);
                setLoading(false);
                setRecLoading(false);
                setRecError(error.message);
            }
        };

        if (id !== prevIdRef.current) {
            fetchData();
        }
    }, [id]);

    const formatPublishedTime = (publishedDateTime) => {
        const date = new Date(publishedDateTime);
        return date.toLocaleString();
    };

    const sanitizeHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;

        const iframes = div.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            const iframe = iframes[i];
            const container = document.createElement('div');
            container.className = 'iframe-container';
            iframe.parentNode.insertBefore(container, iframe);
            container.appendChild(iframe);
        }

        return { __html: div.innerHTML };
    };

    return (
        <div className="news-detail-container">
            <div className="news-main-content">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && news && (
                    <>
                        <h1 className="news-title">{news.title}</h1>
                        <div className="news-info">
                            {news.image && (
                                <img src={API_DOMAIN + news.image} alt={news.title} className="news-image" />
                            )}
                            <div className="news-meta">
                                <p className="news-published" style={{ marginTop: "20px" }}>
                                    <FontAwesomeIcon icon={faClock} className="news-icon" />
                                    <span>{formatPublishedTime(news.published_date_time)}</span>
                                </p>
                                <p className="news-views" style={{ marginTop: "20px" }}>
                                    <FontAwesomeIcon icon={faEye} className="news-icon" />
                                    <span>{news.views}</span>
                                </p>
                                <div className="social-icons" style={{ marginTop: "20px" }}>
                                    <a href={Youtube} className="social-icon-link">
                                        <FontAwesomeIcon icon={faYoutube} className="social-icon" />
                                    </a>
                                    <a href={Telegram} className="social-icon-link">
                                        <FontAwesomeIcon icon={faTelegram} className="social-icon" />
                                    </a>
                                    <a href={X} className="social-icon-link">
                                        <FontAwesomeIcon icon={faXTwitter} className="social-icon" />
                                    </a>
                                    <a href={Instagram} className="social-icon-link">
                                        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                                    </a>
                                    <a href={Facebook} className="social-icon-link">
                                        <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                                    </a>
                                </div>
                                <h5 style={{ marginTop: "20px" }}>{news.tags.map((tag) => (
                                    <a href={API_DOMAIN + 'news/search/#' + tag.name} className={"tag-link"} key={tag.id}>#{tag.name} </a>
                                ))}</h5>
                            </div>
                        </div>
                        <p className="news-description">{news.short_description}</p>
                        <div className="news-body" dangerouslySetInnerHTML={sanitizeHTML(news.body)} />
                    </>
                )}
            </div>

            <div className="recommended-news-container">
                <h2 className="recommended-news-header">Recommended News</h2>
                {recLoading && <p>Loading recommended news...</p>}
                {recError && <p>Error loading recommended news: {recError}</p>}
                <div className="recommended-news-list">
                    {recommendedNews.map((rec, index) => (
                        <a key={rec.id} href={`/post/${rec.id}`} className="recommended-news-link">
                            <div className="recommended-news-item">
                                <h6 className="recommended-news-title" key={index}>{rec.title}</h6>
                                <div className="recommended-news-meta">
                                    <FontAwesomeIcon icon={faClock} className="recommended-news-icon" />
                                    <span className="recommended-news-time">
                                        {formatPublishedTime(rec.published_date_time)}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {recommendedNews.length === 0 && <p>No recommended news available</p>}
            </div>
        </div>
    );
};

const styles = `
.news-detail-container {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
    .news-detail-container {
        flex-direction: row;
    }
}

.news-main-content {
    flex: 2;
    margin-right: 20px;
}

.news-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.news-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

@media (min-width: 768px) {
    .news-info {
        flex-direction: row;
    }
}

.news-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

@media (min-width: 768px) {
    .news-image {
        max-width: 500px;
        min-width: 500px;
        max-height: 300px;
        min-height: 300px;
        margin-right: 20px;
    }
}

.news-meta {
    display: flex;
    flex-direction: column;
}

.news-published, .news-views {
    font-size: 14px;
    color: #777;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.news-icon {
    margin-right: 5px;
}

.social-icons {
    display: flex;
    background-color: #e0e0e0;
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
}

.social-icon-link {
    margin-right: 15px;
    text-decoration: none;
}

.social-icon {
    font-size: 30px;
    color: #333;
    transition: color 0.3s, transform 0.3s;
}

.social-icon-link:hover .social-icon {
    color: #555; /* Change color on hover */
    transform: scale(1.1); /* Slightly enlarge icon on hover */
}

.social-icon-link:active .social-icon {
    color: #000; /* Change color on active */
    transform: scale(1.2); /* Slightly enlarge icon more on active */
}

.news-description {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
}

.news-body {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 20px;
    max-width: 100%; /* Ensure it doesn't overflow on small screens */
    overflow-wrap: break-word; /* Ensure long words wrap instead of overflow */
}

/* Responsive iframe container */
.news-body .iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    margin-top: 20px; /* Add some space above iframes */
}

.news-body .iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.recommended-news-container {
    flex: 1;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

@media (min-width: 768px) {
    .recommended-news-container {
        margin-top: 0;
    }
}

.recommended-news-header {
    font-size: 20px;
    margin-bottom: 10px;
}

.recommended-news-list {
    list-style: none;
    padding: 0;
}

.recommended-news-item {
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    transition: background-color 0.3s, transform 0.3s;
}

.recommended-news-link {
    text-decoration: none;
    color: #333;
}

.tag-link {
    text-decoration: none;
    color: blue;
}

.recommended-news-link:hover .recommended-news-item {
    background-color: #e0e0e0; /* Change background color on hover */
    transform: scale(1.02); /* Slightly enlarge item on hover */
}

.recommended-news-link:active .recommended-news-item {
    background-color: #d0d0d0; /* Change background color on active */
    transform: scale(1.04); /* Slightly enlarge item more on active */
}

.recommended-news-title {
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
}

.recommended-news-meta {
    display: flex;
    align-items: center;
}

.recommended-news-icon {
    color: #777;
    margin-right: 5px;
}

.recommended-news-time {
    font-size: 12px;
    color: #777;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default NewsDetailPage;
