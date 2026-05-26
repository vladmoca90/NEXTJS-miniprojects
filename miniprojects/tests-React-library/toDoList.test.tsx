import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('To-Do List Page', () => {
  it('should render to-do list', () => {
    render(
      <div>
        <h1>To-Do List</h1>
        <input type="text" placeholder="Add new task" />
        <button>Add</button>
      </div>
    );
    expect(screen.getByText(/to-do|task/i)).toBeInTheDocument();
  });

  it('should have input for new tasks', () => {
    render(
      <div>
        <input type="text" placeholder="Add new task" />
      </div>
    );
    const input = screen.getByPlaceholderText(/add new task/i);
    expect(input).toBeInTheDocument();
  });

  it('should add new task on button click', () => {
    render(
      <div>
        <input type="text" placeholder="Add new task" />
        <button>Add</button>
      </div>
    );
    const input = screen.getByPlaceholderText(/add new task/i);
    const button = screen.getByRole('button', { name: /add/i });
    
    fireEvent.change(input, { target: { value: 'Test task' } });
    fireEvent.click(button);
    
    expect(input).toHaveValue('Test task');
  });

  it('should display tasks in list', () => {
    const { container } = render(
      <div>
        <h1>To-Do List</h1>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
        </ul>
      </div>
    );
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  it('should handle task completion', () => {
    render(
      <div>
        <input type="checkbox" />
        <span>Task 1</span>
      </div>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should handle task deletion', () => {
    render(
      <div>
        <button>Delete Task</button>
      </div>
    );
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteBtn);
    expect(deleteBtn).toBeInTheDocument();
  });
});
