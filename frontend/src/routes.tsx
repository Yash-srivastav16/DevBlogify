import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogDetails from './pages/BlogDetails';
import AddEditBlog from './pages/AddEditBlog';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/add-blog" element={<AddEditBlog />} />
                <Route path="/edit-blog/:id" element={<AddEditBlog />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
