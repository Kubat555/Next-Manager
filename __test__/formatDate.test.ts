import { formatDate } from '../utils/format';

test('formats datetime string to date string', () => {
  const input = '2024-06-28T00:00:00';
  const output = formatDate(input);
  expect(output).toBe('28-06-2024');
});

