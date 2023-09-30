import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('BlogForm.js', () => {
  test('calls sending with correct data', async () => {
    const data = {
      title: 'Something',
      author: 'Uncle Bob',
      url: 'http://example.com',
    };
    const mockHandleCreate = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm handleCreate={mockHandleCreate} />);

    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    const submitButton = screen.getByText('Submit');

    await user.type(titleInput, data.title);
    await user.type(authorInput, data.author);
    await user.type(urlInput, data.url);
    await user.click(submitButton);

    expect(mockHandleCreate).toHaveBeenCalledWith(data);
  });
});
