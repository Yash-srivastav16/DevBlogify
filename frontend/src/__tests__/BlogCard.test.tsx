import { render, screen, fireEvent } from '@testing-library/react';
import BlogCard from '../components/BlogCard';
import { BrowserRouter as Router } from 'react-router-dom';

const mockBlog = {
  id: "1",
  title: 'Test Blog',
  content: 'This is a test blog content...',
  tags: ['React', 'Testing'],
  timestamp: new Date().toISOString(),
};

describe('BlogCard Component', () => {
  test('should render the blog title correctly', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    expect(screen.getByText(/Test Blog/)).toBeInTheDocument();
  });

  test('should render the blog content correctly', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    expect(screen.getByText(/This is a test blog content/)).toBeInTheDocument();
  });

  test('should render "New" tag if the blog was created today', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('should call the read more function on click of "Read More" button', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    const readMoreButton = screen.getByText('Read More');
    fireEvent.click(readMoreButton);
    expect(window.location.pathname).toBe(`/blog/${mockBlog.id}`);
  });

  test('should render tags correctly', () => {
    render(
      <Router>
        <BlogCard blog={mockBlog} />
      </Router>
    );
    mockBlog.tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });
});
