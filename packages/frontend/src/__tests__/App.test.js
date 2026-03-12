import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

describe('Delete functionality', () => {
  test('should delete a todo when delete button is clicked', async () => {
    const user = userEvent.setup();
    const testQueryClient = createTestQueryClient();
    
    // Mock initial todos
    const mockTodos = [
      { id: 1, title: 'Test Todo 1', completed: false },
      { id: 2, title: 'Test Todo 2', completed: true },
    ];
    
    global.fetch.mockImplementation((url, options) => {
      if (options?.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'Todo deleted' }),
        });
      }
      // Default: return todos for GET request
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTodos),
      });
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    });

    // Find all delete buttons and click the first one
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Verify DELETE request was made
    await waitFor(() => {
      const deleteCalls = global.fetch.mock.calls.filter(
        call => call[1]?.method === 'DELETE'
      );
      expect(deleteCalls.length).toBeGreaterThan(0);
      expect(deleteCalls[0][0]).toContain('/api/todos/1');
    });
  });
});

describe('Stats calculation', () => {
  test('should display correct count of incomplete and completed todos', async () => {
    const testQueryClient = createTestQueryClient();
    
    // Mock todos with different completion states
    const mockTodos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: false },
      { id: 3, title: 'Todo 3', completed: true },
      { id: 4, title: 'Todo 4', completed: true },
      { id: 5, title: 'Todo 5', completed: true },
    ];
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to appear
    await waitFor(() => {
      expect(screen.getByText('2 items left')).toBeInTheDocument();
      expect(screen.getByText('3 completed')).toBeInTheDocument();
    });
  });

  test('should display zero stats when no todos exist', async () => {
    const testQueryClient = createTestQueryClient();
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for stats to appear
    await waitFor(() => {
      expect(screen.getByText('0 items left')).toBeInTheDocument();
      expect(screen.getByText('0 completed')).toBeInTheDocument();
    });
  });
});

describe('Empty state', () => {
  test('should display empty state message when no todos exist', async () => {
    const testQueryClient = createTestQueryClient();
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for empty state message
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });

  test('should not display empty state message when todos exist', async () => {
    const testQueryClient = createTestQueryClient();
    
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false },
    ];
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockTodos),
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for todos to load
    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    // Empty state should not be present
    expect(screen.queryByText(/no todos yet/i)).not.toBeInTheDocument();
  });
});

describe('Error handling', () => {
  test('should display error message when fetch fails', async () => {
    const testQueryClient = createTestQueryClient();
    
    // Mock fetch to reject
    global.fetch.mockRejectedValue(new Error('Network error'));

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });

  test('should display error message when API returns non-ok response', async () => {
    const testQueryClient = createTestQueryClient();
    
    // Mock fetch to return error response
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: 'Server error' }),
    });

    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
