import { render, screen, fireEvent } from '@testing-library/react';
import NoBlogsFound from '../components/NoBlogsFound';

describe('NoBlogsFound Component', () => {
  test('should display the message passed as a prop', () => {
    const message = "No blogs match your search criteria.";

    render(<NoBlogsFound message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  test('should display the default image if no image prop is passed', () => {
    render(<NoBlogsFound message="No blogs match your search criteria." />);

    const image = screen.getByAltText('No Blogs Found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/no-result.webp');
  });

  test('should display the custom image if the image prop is passed', () => {
    const customImage = "/custom-image.webp";

    render(
      <NoBlogsFound message="No blogs match your search criteria." image={customImage} />
    );

    const image = screen.getByAltText('No Blogs Found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', customImage);
  });

  test('should display the reset button and trigger the onResetFilter callback when clicked', () => {
    const mockResetFilter = jest.fn();

    render(
      <NoBlogsFound
        message="No blogs match your search criteria."
        onResetFilter={mockResetFilter}
      />
    );

    const resetButton = screen.getByText('Reset Search');
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);

    expect(mockResetFilter).toHaveBeenCalledTimes(1);
  });

  test('should not render the reset button if no onResetFilter prop is passed', () => {
    render(<NoBlogsFound message="No blogs match your search criteria." />);

    const resetButton = screen.queryByText('Reset Search');
    expect(resetButton).not.toBeInTheDocument();
  });
});
