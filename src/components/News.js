import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Newsitems from "./Newsitems";
import { getLatestNews } from "./config";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = () => {
            setLoading(true);
            getLatestNews(50, props.category)
                .then(data => {
                    setArticles(data.results);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Fetching news failed: ", error);
                    setLoading(false);
                });
        };

        fetchNews();
    }, [props.category, props.title]);

    return (
        <>
            <h1 className="text-center example-big">Soat UZ - Top {props.title} news</h1>

            {loading && <Loading />}

            <div className="container">
                <div className="row">
                    {articles.map((element, index) => (
                        <div className="col-md-4" key={index}>
                            <Newsitems
                                title={element.title}
                                description={element.short_description}
                                imgUrl={element.image}
                                newsUrl={'/post/' + element.id}
                                datetime={element.published_date_time}
                                views={element.views}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

// CSS for hover and active effects
const styles = `
.news-item {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    overflow: hidden;
    transition: box-shadow 0.3s;
}

.news-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.news-item-link {
    display: block;
    text-decoration: none;
    color: inherit;
}

.news-item-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.news-item-description {
    font-size: 14px;
    line-height: 1.4;
    color: #777;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limiting to 3 lines */
    -webkit-box-orient: vertical;
}

.news-item-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
}

.news-item-meta .news-icon {
    margin-right: 5px;
}

.loading {
    text-align: center;
    margin-top: 20px;
}
`;

// Inject styles into the head of the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default News;
