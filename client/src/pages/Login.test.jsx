import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ login: vi.fn() })
}));

test('Login page uses card layout and primary button', () => {
  const { container } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  expect(container.firstChild).toHaveClass('card');
  expect(screen.getByRole('button', { name: /Entrar/i })).toHaveClass('btn-primary');
});
