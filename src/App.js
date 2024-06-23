import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getCategories } from "./components/config";
import NewsDetailPage from "./components/NewsDetail";

const App = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(all_categories => {
                setCategories(all_categories);
            })
            .catch(error => {
                console.error("Failed to fetch categories", error);
            });
    }, []);

    return (
        <div>
            <Router>
                <Navbar categories={categories}/>
                <Routes>
                    <Route exact path="/" element={<News category="all" title="" />} />
                    {categories.map((category) => (
                        <Route
                            key={category.slug}
                            exact
                            path={"/" + category.slug}
                            element={<News category={category.slug} title={category.title} />}
                        />
                    ))}
                    <Route path="/post/:id" element={<NewsDetailPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
