import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Transactions from '../src/app/transactions-props/page';

describe('Transactions Page', () => {
  const mockTransactions = [
    {
      id: 1,
      date: '2024-02-26T13:18:21.849Z',
      amount: 31.12,
      name: 'Currys',
      category: 'shopping',
    },
    {
      id: 2,
      date: '2024-02-26T13:17:21.849Z',
      amount: 196.65,
      name: 'Premier Inn',
      category: 'travel',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ body: mockTransactions }),
      }) as any
    );
  });

  it('renders loading state and then transaction rows', async () => {
    render(<Transactions />);

    expect(screen.queryByAltText('Loading...') || screen.queryByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Currys')).toBeInTheDocument();
      expect(screen.getByText('Premier Inn')).toBeInTheDocument();
    });
  });

  it('selects a transaction when a row is clicked', async () => {
    render(<Transactions />);

    await waitFor(() => expect(screen.getByText('Currys')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Currys'));

    expect(screen.getByText(/Name:/)).toBeInTheDocument();
    expect(screen.getByText('Currys')).toBeInTheDocument();
  });

  it('deletes a transaction when the close button is clicked', async () => {
    const { container } = render(<Transactions />);

    await waitFor(() => expect(screen.getByText('Currys')).toBeInTheDocument());

    const closeButton = container.querySelector('.close-btn');
    expect(closeButton).toBeInTheDocument();

    if (closeButton) {
      fireEvent.click(closeButton);
    }

    await waitFor(() => {
      expect(screen.queryByText('Currys')).toBeNull();
    });
  });
});
