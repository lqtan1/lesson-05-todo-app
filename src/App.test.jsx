import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
  jest.restoreAllMocks();
});

test('adds a todo and updates statistics', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Thêm công việc mới'), { target: { value: 'Học React' } });
  fireEvent.click(screen.getByRole('button', { name: 'Thêm việc' }));
  expect(screen.getByText('Học React')).toBeInTheDocument();
  expect(screen.getByText('Tổng số').nextElementSibling).toHaveTextContent('1');
  expect(screen.getByText('Chưa xong', { selector: 'dt' }).nextElementSibling).toHaveTextContent('1');
  expect(JSON.parse(window.localStorage.getItem('todos'))[0].text).toBe('Học React');
});

test('rejects an empty todo', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Thêm việc' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Vui lòng nhập nội dung');
});

test('filters and searches todos', () => {
  window.localStorage.setItem('todos', JSON.stringify([
    { id: '1', text: 'Học React', done: false },
    { id: '2', text: 'Đọc tài liệu', done: true }
  ]));
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Đã xong' }));
  expect(screen.getByText('Đọc tài liệu')).toBeInTheDocument();
  expect(screen.queryByText('Học React')).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Tìm kiếm công việc'), { target: { value: 'không có' } });
  expect(screen.getByText('Không tìm thấy kết quả')).toBeInTheDocument();
});

test('toggles and deletes a todo', () => {
  window.localStorage.setItem('todos', JSON.stringify([{ id: '1', text: 'Việc thử nghiệm', done: false }]));
  render(<App />);
  const checkbox = screen.getByRole('checkbox', { name: 'Đánh dấu hoàn thành: Việc thử nghiệm' });
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: 'Xóa công việc: Việc thử nghiệm' }));
  expect(screen.getByText('Chưa có công việc nào')).toBeInTheDocument();
});
