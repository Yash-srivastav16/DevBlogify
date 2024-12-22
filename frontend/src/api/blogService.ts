import axios from 'axios';

const API_URL = "https://devblogify-backend.onrender.com";

//Fetch All Blogs
export const fetchBlogs = async() => {
    try {
        const reponse = await axios.get(`${API_URL}/blogs`);
        return reponse.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error;
    }
};

//Fetch Single Blogs by ID
export const fetchBlogById = async (id : string) => {
    try {
        const reponse = await axios.get(`${API_URL}/blogs/${id}`);
        return reponse.data;
    } catch (error) {
        console.error(`Error fecthing blog with ID ${id}:`, error);
        throw error; 
    }
}

//Add a new blog
export const addBlog = async (blogData: { title: string; content: string; tags: string}) => {
    try {
        const response = await axios.post(`${API_URL}/blogs`, blogData);
        return response.data;
    } catch (error) {
        console.error("Error adding blog: ", error);
        throw error;
    }
}

//Update an existing blog
export const updateBlog = async (id: string, blogData: { title: string; content: string; tags: string}) => {
    try {
        const response = await axios.put(`${API_URL}/blogs/${id}`, blogData);
        return response.data;
    } catch (error) {
        console.error(`Error updating blog with ID ${id}: `, error);
        throw error;
    }
}

//Delete a blog
export const deleteBlog = async (id: string) => {
    try {
        const reponse = await axios.delete(`${API_URL}/blogs/${id}`);
        return reponse.data;
    } catch (error) {
        console.error(`Error deleting blog with ID ${id}: `, error);
        throw error;
    }
}