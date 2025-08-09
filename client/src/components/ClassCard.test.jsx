import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ClassCard from './ClassCard';

const sampleClass = {
  title: 'Salsa 101',
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  description: 'Basics of salsa',
};

test('renders card with primary and danger buttons', () => {
  const onBook = vi.fn();
  const onCancel = vi.fn();
  const { container } = render(
    <ClassCard classData={sampleClass} onBook={onBook} onCancel={onCancel} />
  );
  expect(container.firstChild).toHaveClass('card');
  expect(screen.getByRole('button', { name: /Inscribirme/i })).toHaveClass('btn-primary');
  expect(screen.getByRole('button', { name: /Darme de baja/i })).toHaveClass('btn-danger');
});
