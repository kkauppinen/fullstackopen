import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog.js', () => {
  test('renders only title and author by default', () => {
    const blog = {
      title: 'Something',
      author: 'Uncle Bob',
      url: 'http://example.com',
      likes: 2,
      user: { username: 'theCat' },
    };

    render(<Blog blog={blog} />);
    const urlElement = screen.queryByText(blog.url);
    const likesElement = screen.queryByText(blog.likes);

    screen.getByText('Something Uncle Bob');
    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  test('shows all details after click', async () => {
    const blog = {
      title: 'Something',
      author: 'Uncle Bob',
      url: 'http://example.com',
      likes: 2,
      user: { username: 'theCat' },
    };
    const user = userEvent.setup();

    render(<Blog blog={blog} />);
    const button = screen.getByText('View');
    await user.click(button);

    screen.getByText(blog.url);
    screen.getByText(blog.likes);
  });

  test('Like is called as many times than the button is clicked', async () => {
    const blog = {
      title: 'Something',
      author: 'Uncle Bob',
      url: 'http://example.com',
      likes: 2,
      user: { username: 'theCat' },
    };
    const mockLikeHandler = jest.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} handleLike={mockLikeHandler} />);

    const viewButton = screen.getByText('View');
    await user.click(viewButton);
    const likeButton = screen.getByText('Like!');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHandler).toHaveBeenCalledTimes(2);
  });
});
