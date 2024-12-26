import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {

  test('should render the correct copyright text with the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} DevBlogify. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });

  test('should render the developer\'s name', () => {
    render(<Footer />);
    const developerText = screen.getByText('Made with ❤️ by Yash Srivastav');
    expect(developerText).toBeInTheDocument();
  });

});
