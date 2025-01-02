import { render, screen } from '@testing-library/react';
import LoadingBar from '../components/LoadingBar';
import '@testing-library/jest-dom';

describe('LoadingBar Component', () => {
  test('should display the logo image', () => {
    render(<LoadingBar />);

    const logoImage = screen.getByAltText('Error');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', '/logo.webp');
  });

  test('should display the CircularProgress spinner', () => {
    render(<LoadingBar />);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});
