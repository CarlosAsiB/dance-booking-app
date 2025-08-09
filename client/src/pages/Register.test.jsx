import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Register from './Register';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ register: vi.fn() })
}));

test('Register page uses card layout and primary button', () => {
  const { container } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
  expect(container.firstChild).toHaveClass('card');
  expect(screen.getByRole('button', { name: /Registrarse/i })).toHaveClass('btn', 'btn-primary');
});
