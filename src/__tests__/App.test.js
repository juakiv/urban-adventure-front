import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders start button', () => {
  render(<App />);
  const button = screen.getByText(/Start Game/i);
  expect(button).toBeInTheDocument();
});

test("Is there a Canvas", () => {
  render(<App/>);
  const canvas = screen.getByTestId("canvas");
  expect(canvas).toBeInTheDocument();
});


