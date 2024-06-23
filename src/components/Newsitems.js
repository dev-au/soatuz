import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Newsitems = (props) => {
    const { title, description, imgUrl, newsUrl, datetime, views } = props;

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const cardStyle = {
        height: "460px",
        borderRadius: "8px",
        boxShadow: hovered ? "0 0 15px rgba(0, 0, 0, 0.2)" : "0 0 10px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
    };

    const linkStyle = {
        textDecoration: "none",
        color: "inherit",
        display: "block",
        transition: "transform 0.2s ease",
        transform: hovered ? "scale(1.02)" : "scale(1)",
    };

    return (
        <Link
            to={newsUrl}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="my-3 mx-3">
                <div className="card" style={cardStyle}>
                    <div
                        style={{
                            height: "220px",
                            overflow: "hidden",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                        }}
                    >
                        <img
                            src={imgUrl}
                            className="card-img-top"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                            }}
                            alt="News Thumbnail"
                        />
                    </div>
                    <div className="card-body" style={{ padding: "15px", position: "relative" }}>
                        <h5
                            className="card-title"
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: "bold",
                                marginBottom: "0.75rem",
                            }}
                        >
                            {title}
                        </h5>
                        <p
                            className="card-text"
                            style={{
                                marginBottom: "1rem",
                                lineHeight: "1.5",
                                maxHeight: "100px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                            }}
                        >
                            {description}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                position: "absolute",
                                bottom: "10px",
                                left: "15px",
                                right: "15px",
                            }}
                        >
                            <small>
                                <FontAwesomeIcon icon={faEye} className="me-1" />
                                {views}
                            </small>
                            <small>
                                <FontAwesomeIcon icon={faClock} className="me-1" />
                                {new Date(datetime).toLocaleString()}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Newsitems;
