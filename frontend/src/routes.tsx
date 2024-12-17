import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogDetails from './pages/BlogDetails';
import AddEditBlog from './pages/AddEditBlog';
import AboutDev from './pages/AboutDev';

const AppRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:id" element={<BlogDetails />} />
                <Route path="/add-blog" element={<AddEditBlog />} />
                <Route path="/edit-blog/:id" element={<AddEditBlog />} />
                <Route path="/about" element={<AboutDev />} />
            </Routes>

    );
};

export default AppRoutes;
