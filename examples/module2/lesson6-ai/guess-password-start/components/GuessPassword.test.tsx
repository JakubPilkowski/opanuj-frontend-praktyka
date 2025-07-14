// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { GuessPassword } from './GuessPassword';

describe('GuessPassword Component', () => {
  afterEach(cleanup);

  it('should display error on wrong password', async () => {
    render(<GuessPassword />);

    // Simulate typing wrong password
    const input = screen.getByPlaceholderText('Wpisz hasło...');
    await userEvent.type(input, 'wrong password');

    // Simulate form submission
    const button = screen.getByText('Zgadnij');
    await userEvent.click(button);

    // Assert error message
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });

  it('should display success message on correct password', async () => {
    // Mock alert
    window.alert = vi.fn();

    render(<GuessPassword />);

    // Simulate typing correct password
    const input = screen.getByPlaceholderText('Wpisz hasło...');
    await userEvent.type(input, 'Pickle Rick');

    // Simulate form submission
    const button = screen.getByText('Zgadnij');
    await userEvent.click(button);

    // Assert success
    expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło.');
  });

  it('displays error for empty input', async () => {
    render(<GuessPassword />);
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });

  it('displays error for whitespace input', async () => {
    render(<GuessPassword />);
    await userEvent.type(screen.getByPlaceholderText('Wpisz hasło...'), '   ');
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });

  it('accepts correct password with different casing', async () => {
    render(<GuessPassword />);
    await userEvent.type(
      screen.getByPlaceholderText('Wpisz hasło...'),
      'PiCkLe RiCk'
    );
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.queryByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).not.toBeInTheDocument();
  });

  it('displays error for input with special characters', async () => {
    render(<GuessPassword />);
    await userEvent.type(
      screen.getByPlaceholderText('Wpisz hasło...'),
      'pickle rick!'
    );
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });

  it('accepts correct password with leading/trailing whitespace', async () => {
    render(<GuessPassword />);
    await userEvent.type(
      screen.getByPlaceholderText('Wpisz hasło...'),
      '  pickle rick  '
    );
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.queryByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).not.toBeInTheDocument();
  });

  it('displays error for partial match', async () => {
    render(<GuessPassword />);
    await userEvent.type(
      screen.getByPlaceholderText('Wpisz hasło...'),
      'pickle'
    );
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });

  it('displays error for numeric input', async () => {
    render(<GuessPassword />);
    await userEvent.type(
      screen.getByPlaceholderText('Wpisz hasło...'),
      '123456'
    );
    await userEvent.click(screen.getByText('Zgadnij'));
    expect(
      screen.getByText(
        'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
      )
    ).toBeInTheDocument();
  });
});
