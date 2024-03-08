// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { renderItems } from './renderer';

const users: User[] = [
  { id: 1, name: 'John', age: 30, role: 'user' },
  { id: 2, name: 'Jane', age: 25, role: 'admin' },
  { id: 3, name: 'Jack', age: 40, role: 'user' },
];

describe('User renderer', () => {
  const adminUsers = users.filter((user) => user.role === 'admin');
  const nonAdminUsers = users.filter((user) => user.role === 'user');

  test('should render all users if admin is rendering the list', () => {
    localStorage.setItem('userRole', 'admin');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(
      users.length
    );
  });

  test('should render only regular users if non-admin is rendering the list', () => {
    localStorage.setItem('userRole', 'user');

    const nonAdminUsers = users.filter((user) => user.role === 'user');

    const container = document.createElement('div');
    renderItems(container, users);
    const listItems = Array.from(container.querySelectorAll('li'));
    expect(listItems).toHaveLength(nonAdminUsers.length);
  });

  test('should render admin label for admin users', () => {
    localStorage.setItem('userRole', 'admin');
    const container = document.createElement('div');
    renderItems(container, adminUsers);

    const listItems = Array.from(container.querySelectorAll('li'));
    listItems.forEach((item) => {
      expect(item.innerHTML).toContain('(Admin)');
    });
  });

  test('should not render admin label for non-admin users', () => {
    localStorage.setItem('userRole', 'admin');
    const container = document.createElement('div');
    renderItems(container, nonAdminUsers);

    const listItems = Array.from(container.querySelectorAll('li'));
    listItems.forEach((item) => {
      expect(item.innerHTML).not.toContain('(Admin)');
    });
  });

  test('should render name and age for each user', () => {
    localStorage.setItem('userRole', 'admin');
    const container = document.createElement('div');

    renderItems(container, nonAdminUsers);

    const listItems = Array.from(container.querySelectorAll('li'));

    listItems.forEach((item, idx) => {
      expect(item.innerHTML).toContain(`Name: ${nonAdminUsers[idx].name}`);
      expect(item.innerHTML).toContain(`Age: ${nonAdminUsers[idx].age}`);
    });
  });
});
