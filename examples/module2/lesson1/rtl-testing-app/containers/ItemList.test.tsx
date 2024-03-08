import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import ItemList from './ItemList';

afterEach(cleanup);

describe('useItemsController', () => {
  it('should render ItemList', () => {
    render(<ItemList />);

    expect(screen.getByRole('list')).toBeEmptyDOMElement();
    expect(
      screen.getByRole('button', { name: 'Dodaj produkt' })
    ).toBeInTheDocument();
  });

  it('should add item', () => {
    render(<ItemList />);

    fireEvent.change(screen.getByLabelText('Nazwa produktu'), {
      target: { value: 'Testowy produkt' },
    });

    expect(screen.getByDisplayValue('Testowy produkt'));

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText('Testowy produkt')).toBeInTheDocument();
  });

  it('should delete item', () => {
    render(
      <ItemList baseState={{ items: [{ id: 1, name: 'Testowy produkt' }] }} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Usuń' }));

    expect(screen.queryByText('Testowy produkt')).not.toBeInTheDocument();
  });
});
