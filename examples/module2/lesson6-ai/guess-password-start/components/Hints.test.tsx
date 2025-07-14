import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GuessPassword } from './GuessPassword';
import { Hints } from './Hints';
import userEvent from '@testing-library/user-event';

describe('GuessPassword and Hints Integration', () => {
  it('should display hint and allow password guessing', async () => {
    render(
      <>
        <GuessPassword />
        <Hints />
      </>
    );

    // Display a hint
    const hintButton = screen.getByText('Pokaż podpowiedź');
    userEvent.click(hintButton);
    expect(
      screen.getByText('Ogórek i Rick połączeni w jedno')
    ).toBeInTheDocument();

    // Simulate entering the correct password
    const input = screen.getByPlaceholderText('Wpisz hasło...');
    userEvent.type(input, 'Pickle Rick');
    const submitButton = screen.getByText('Zgadnij');
    userEvent.click(submitButton);

    // Check for success alert
    await expect(window.alert).toHaveBeenCalledWith('Brawo! Zgadłeś hasło.');
  });
});
