import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Password Guessing Game with Accessibility Focus', () => {
  test('should correctly guess the password using hints and ensure accessibility attributes', async ({
    page,
  }) => {
    // Open the app
    await page.goto('http://localhost:3000'); // Zmień na właściwy adres URL aplikacji

    // Upewnij się, że pole hasła ma poprawne etykiety dostępności
    const passwordInput = await page.getByRole('textbox', {
      name: 'Wpisz hasło...',
    });

    // Wprowadzenie błędnego hasła
    await passwordInput.fill('wrong password');
    await page.getByRole('button', { name: 'Zgadnij' }).click();

    // Sprawdzenie, czy komunikat błędu jest wyświetlany i dostępny
    const errorMessage = page.locator('div.text-red-500');
    await expect(errorMessage).toHaveText(
      'Niepoprawne hasło. Spróbuj ponownie lub skorzystaj z podpowiedzi.'
    );

    // Upewnij się, że przycisk "Pokaż podpowiedź" ma poprawne atrybuty ARIA
    const hintButton = await page.getByRole('button', {
      name: 'Pokaż podpowiedź',
    });

    // Kliknij przycisk podpowiedzi i sprawdź, czy podpowiedź jest wyświetlana
    await hintButton.click();
    const hintMessage = page.locator('.text-green-500');
    await expect(hintMessage).toHaveText('Ogórek i Rick połączeni w jedno');

    // Wprowadzenie poprawnego hasła
    await passwordInput.fill('Pickle Rick');
    await page.getByRole('button', { name: 'Zgadnij' }).click();

    // Sprawdzenie, czy komunikat sukcesu jest wyświetlany i poprawnie obsługiwany
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('Brawo! Zgadłeś hasło.');
      await dialog.dismiss();
    });
  });
});

test.describe('homepage', () => {
  // 2
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000'); // 3

    const passwordInput = await page.getByRole('textbox', {
      name: 'Wpisz hasło...',
    });

    // Wprowadzenie błędnego hasła
    await passwordInput.fill('wrong password');
    await page.getByRole('button', { name: 'Zgadnij' }).click();

    // Upewnij się, że przycisk "Pokaż podpowiedź" ma poprawne atrybuty ARIA
    const hintButton = await page.getByRole('button', {
      name: 'Pokaż podpowiedź',
    });

    // Kliknij przycisk podpowiedzi i sprawdź, czy podpowiedź jest wyświetlana
    await hintButton.click();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});
