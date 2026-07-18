import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import actorsReducer from '../src/app/actors/store/features/actorsSlice';
import ActorsContentComponent from '../src/app/actors/ActorsContentComponents';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />, 
}));

const mockActors = [
  {
    img: '/images/actor-1.jpg',
    name: 'Leonardo DiCaprio',
    biography: 'Academy Award-winning actor.',
  },
  {
    img: '/images/actor-2.jpg',
    name: 'Meryl Streep',
    biography: 'Renowned actress with multiple awards.',
  },
];

describe('ActorsContentComponent (Jest)', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({ reducer: { actors: actorsReducer } });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ body: mockActors }),
      }) as unknown as typeof fetch
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the loading state initially and then loads actors', async () => {
    render(
      <Provider store={store}>
        <ActorsContentComponent />
      </Provider>
    );

    expect(screen.getByAltText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    });

    expect(screen.getByText('Academy Award-winning actor.')).toBeInTheDocument();
  });

  it('filters actors by search query', async () => {
    render(
      <Provider store={store}>
        <ActorsContentComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'Meryl' },
    });

    expect(screen.getByText('Meryl Streep')).toBeInTheDocument();
    expect(screen.queryByText('Leonardo DiCaprio')).not.toBeInTheDocument();
  });

  it('clears the search and restores the full list', async () => {
    render(
      <Provider store={store}>
        <ActorsContentComponent />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/search by name/i), {
      target: { value: 'Meryl' },
    });

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(screen.getByText('Leonardo DiCaprio')).toBeInTheDocument();
    expect(screen.getByText('Meryl Streep')).toBeInTheDocument();
  });
});
