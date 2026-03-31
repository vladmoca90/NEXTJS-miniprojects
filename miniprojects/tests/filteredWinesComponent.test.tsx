import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilteredWinesComponent from '../src/app/wines-dropdown-context/FilteredWinesComponent';

const mockWine = {
  id: 99,
  name: 'Test Wine',
  img: '/images/wines/test-wine.jpg',
  text: 'Test wine description',
};

describe('FilteredWinesComponent', () => {
  it('renders wine details and the details link', () => {
    const onDeletedWine = jest.fn();

    render(<FilteredWinesComponent wine={mockWine} onDeletedWine={onDeletedWine} />);

    expect(screen.getByText('Test Wine')).toBeInTheDocument();
    expect(screen.getByAltText('Test Wine')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Check details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/wine-details?wineName=Test%20Wine');
  });

  it('calls onDeletedWine when close icon is clicked', () => {
    const onDeletedWine = jest.fn();
    const { container } = render(<FilteredWinesComponent wine={mockWine} onDeletedWine={onDeletedWine} />);

    const closeButton = container.querySelector('.product-close');
    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(onDeletedWine).toHaveBeenCalledTimes(1);
  });
});
