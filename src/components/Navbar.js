import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getCategories, getLatestNews} from "./config";
import {BsSearch} from "react-icons/bs";

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await getCategories(); // Fetch categories from API
                setCategories(allCategories);

            } catch (error) {
                console.error("Failed to fetch categories", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchChange = async event => {
        const query = event.target.value;
        setSearchQuery(query);

        try {
            const results = await getLatestNews(query); // Call your API function to search news
            setSearchResults(results);
        } catch (error) {
            console.error("Failed to search news", error);
            setSearchResults([]);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{fontSize: "25px"}}>
                    Soat UZ
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {categories.map((category, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={`/${category.slug}`}>
                                    {category.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="input-group mb2-lg-0" style={{ marginRight: "30px", maxWidth: "500px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search news"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className="btn btn-outline-light" type="button">
                            <BsSearch/>
                        </button>
                    </div>
                    {searchResults.length > 0 && (
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="/"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Search Results
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {searchResults.map((newsItem, index) => (
                                    <li key={index}>
                                        <Link className="dropdown-item" to={`/news/${newsItem.id}`}>
                                            {newsItem.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
