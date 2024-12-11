// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Home from './Home';
// import { act } from '@testing-library/react';

// // Enable fake timers globally for this test file
// act(() => {
//   jest.useFakeTimers(); // Enable fake timers
// });

// // Mock child components
// jest.mock('../components/Card', () => {
//   const MockCard = ({ name, prompt }) => (
//     <div data-testid='card'>
//       {name}: {prompt}
//     </div>
//   );
//   MockCard.displayName = 'Card'; // Add displayName
//   return MockCard;
// });

// jest.mock('../components/Loader', () => {
//   const MockLoader = () => <div data-testid='loader'>Loading...</div>;
//   MockLoader.displayName = 'Loader'; // Add displayName
//   return MockLoader;
// });

// jest.mock('../components/FormField', () => {
//   const MockFormField = ({ handleChange, value }) => (
//     <input
//       data-testid='search-input'
//       type='text'
//       placeholder='Search something...'
//       onChange={handleChange}
//       value={value}
//     />
//   );
//   MockFormField.displayName = 'FormField'; // Add displayName
//   return MockFormField;
// });

// // Mock window.alert
// beforeAll(() => {
//   jest.spyOn(window, 'alert').mockImplementation(() => {});
// });

// describe('Home Component', () => {
//   const mockPosts = [
//     { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
//     { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
//   ];

//   beforeEach(() => {
//     // Mock the fetch API
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ data: mockPosts }),
//       })
//     );
//   });

//   afterEach(() => {
//     jest.clearAllTimers(); // Clear any active timers
//     // jest.useRealTimers(); // Reset timers to real after tests
//   });

//   it('should render header and description on initial load', () => {
//     render(<Home />);
//     expect(screen.getByText(/The community Showcase/i)).toBeInTheDocument();
//     expect(screen.getByText(/Browse through a collection of imaginative and visually stunning images/i)).toBeInTheDocument();
//   });

//   it('should display the loader while fetching posts', () => {
//     const mockFetch = jest.fn(
//       () =>
//         new Promise((resolve) => {
//           // Simulate a delay to ensure loading is tested
//           setTimeout(() => resolve({ ok: true, json: () => ({ data: [] }) }), 100);
//         })
//     );

//     global.fetch = mockFetch;

//     render(<Home />);

//     // Loader should be visible during loading
//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//   });

//   it('should fetch and render posts from API', async () => {
//     const mockPosts = [
//       { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
//       { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
//     ];

//     // Mock fetch
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ data: mockPosts }),
//       })
//     );

//     render(<Home />);

//     await waitFor(() => {
//       expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
//     });

//     expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();
//     expect(screen.getByText(/Post 2: Ocean waves/i)).toBeInTheDocument();
//   });

//   it('should filter posts when a search term is entered', async () => {
//     render(<Home />);

//     // Wait for posts to load
//     await waitFor(() => {
//       expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
//     });

//     const searchInput = screen.getByTestId('search-input');

//     // Change the search input value to 'sunset'
//     fireEvent.change(searchInput, { target: { value: 'sunset' } });

//     // Advance timers to simulate debounce
//     act(() => {
//       jest.advanceTimersByTime(500);
//     });

//     // Wait for the DOM to update based on the filtered results
//     await waitFor(() => {
//       // Ensure only "Post 1: Beautiful sunset" is displayed
//       const filteredPosts = screen.getAllByTestId('card');
//       expect(filteredPosts).toHaveLength(1);
//       expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();

//       // Ensure "Post 2: Ocean waves" is not displayed
//       expect(screen.queryByText(/Post 2: Ocean waves/i)).not.toBeInTheDocument();
//     });
//   });

//   it('should display fallback message if no search results are found', async () => {
//     const mockPosts = [
//       { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
//       { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
//     ];

//     // Mock fetch
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ data: mockPosts }),
//       })
//     );

//     render(<Home />);

//     await waitFor(() => {
//       expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
//     });

//     const searchInput = screen.getByTestId('search-input');
//     fireEvent.change(searchInput, { target: { value: 'mountain' } });

//     act(() => {
//       jest.advanceTimersByTime(500); // Simulate debounce
//     });

//     await waitFor(() => {
//       expect(screen.getByText(/No Search Results Found/i)).toBeInTheDocument();
//     });
//   });

//   it('should display fallback message if no posts exist', async () => {
//     // Mock fetch with no posts
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ data: [] }),
//       })
//     );

//     render(<Home />);

//     await waitFor(() => {
//       expect(screen.getByText(/No Posts Found/i)).toBeInTheDocument();
//     });
//   });
// });

//? 2
// import { render, screen, waitFor, act } from '@testing-library/react';
// import Home from './Home';

// // Enable fake timers at the start of the file
// jest.useFakeTimers();

// jest.mock('../components/Card', () => {
//   const MockCard = ({ name, prompt }) => (
//     <div data-testid='card'>
//       {name}: {prompt}
//     </div>
//   );
//   return MockCard;
// });

// jest.mock('../components/Loader', () => {
//   const MockLoader = () => <div data-testid='loader'>Loading...</div>;
//   MockLoader.displayName = 'Loader'; // Optional: helps with debugging
//   return MockLoader;
// });

// jest.mock('../components/FormField', () => {
//   const MockFormField = ({ handleChange, value }) => (
//     <input
//       data-testid='search-input'
//       type='text'
//       placeholder='Search something...'
//       onChange={handleChange}
//       value={value}
//     />
//   );
//   MockFormField.displayName = 'FormField'; // Optional: helps with debugging
//   return MockFormField;
// });

// // Mock global fetch API
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ data: [{ id: 1, name: 'Test', prompt: 'Example Prompt' }] }),
//   })
// );

// describe('Home Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks(); // Clear any mocks between tests
//   });

//   it('fetches and displays posts', async () => {
//     await act(async () => {
//       render(<Home />);
//     });

//     await waitFor(() => {
//       const cards = screen.getAllByTestId('card');
//       expect(cards).toHaveLength(1);
//     });

//     expect(screen.getByText(/Test: Example Prompt/i)).toBeInTheDocument();
//   });

//   it('displays a loader during data fetching', async () => {
//     // Mock fetch with a delay to simulate loading state
//     global.fetch = jest.fn(
//       () =>
//         new Promise((resolve) =>
//           setTimeout(
//             () =>
//               resolve({
//                 ok: true,
//                 json: () => Promise.resolve({ data: [] }),
//               }),
//             100 // Delay for loader visibility
//           )
//         )
//     );

//     render(<Home />);

//     // Assert that loader is visible initially
//     expect(screen.getByTestId('loader')).toBeInTheDocument();

//     // Wait for fetch to resolve and loader to be removed
//     await act(async () => {
//       jest.advanceTimersByTime(100); // Match the fetch delay
//     });

//     await waitFor(() => {
//       expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
//     });
//   });

//   it('handles no posts gracefully', async () => {
//     fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve({ data: [] }),
//     });

//     await act(async () => {
//       render(<Home />);
//     });

//     await waitFor(() => {
//       expect(screen.getByText(/No Posts Found/i)).toBeInTheDocument();
//     });
//   });
// });

//? 3
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Home from './Home';

// Enable fake timers at the start of the file
jest.useFakeTimers();

// Mock child components
jest.mock('../components/Card', () => {
  const MockCard = ({ name, prompt }) => (
    <div data-testid='card'>
      {name}: {prompt}
    </div>
  );
  MockCard.displayName = 'Card';
  return MockCard;
});

jest.mock('../components/Loader', () => {
  const MockLoader = () => <div data-testid='loader'>Loading...</div>;
  MockLoader.displayName = 'Loader'; // Optional: helps with debugging
  return MockLoader;
});

jest.mock('../components/FormField', () => {
  const MockFormField = ({ handleChange, value }) => (
    <input
      data-testid='search-input'
      type='text'
      placeholder='Search something...'
      onChange={handleChange}
      value={value}
    />
  );
  MockFormField.displayName = 'FormField'; // Optional: helps with debugging
  return MockFormField;
});

// Mock window.alert to prevent actual alerts during tests
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Reset mocks and timers before each test
beforeEach(() => {
  jest.clearAllMocks(); // Clear any mocks between tests
  jest.clearAllTimers(); // Clear any active timers
});

// Restore real timers after all tests
afterAll(() => {
  jest.useRealTimers();
});

describe('Home Component', () => {
  // 1. should render header and description on initial load
  it('should render header and description on initial load', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch to return mockPosts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    await act(async () => {
      render(<Home />);
    });

    // Check header and description
    expect(screen.getByText(/The community Showcase/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse through a collection of imaginative and visually stunning images/i)).toBeInTheDocument();
  });

  // 2. should display the loader while fetching posts
  it('should display the loader while fetching posts', async () => {
    // Mock fetch with a delay to simulate loading state
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ data: [] }),
              }),
            100 // Delay for loader visibility
          )
        )
    );

    render(<Home />);

    // Assert that loader is visible initially
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Advance timers to resolve fetch
    await act(async () => {
      jest.advanceTimersByTime(100); // Match the fetch delay
    });

    // Wait for loader to be removed
    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  // 3. should fetch and render posts from API
  it('should fetch and render posts from API', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch to return mockPosts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(mockPosts.length);
    });

    expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();
    expect(screen.getByText(/Post 2: Ocean waves/i)).toBeInTheDocument();
  });

  // 4. should filter posts when a search term is entered
  it('should filter posts when a search term is entered', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch to return mockPosts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    render(<Home />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
    });

    const searchInput = screen.getByTestId('search-input');

    // Change the search input value to 'sunset'
    fireEvent.change(searchInput, { target: { value: 'sunset' } });

    // Advance timers to simulate debounce
    act(() => {
      jest.advanceTimersByTime(500); // Simulate debounce
    });

    // Wait for the DOM to update based on the filtered results
    await waitFor(() => {
      const filteredPosts = screen.getAllByTestId('card');
      expect(filteredPosts).toHaveLength(1);
      expect(screen.getByText(/Post 1: Beautiful sunset/i)).toBeInTheDocument();

      // Ensure "Post 2: Ocean waves" is not displayed
      expect(screen.queryByText(/Post 2: Ocean waves/i)).not.toBeInTheDocument();
    });
  });

  // 5. should display fallback message if no search results are found
  it('should display fallback message if no search results are found', async () => {
    const mockPosts = [
      { id: 1, name: 'Post 1', prompt: 'Beautiful sunset' },
      { id: 2, name: 'Post 2', prompt: 'Ocean waves' },
    ];

    // Mock fetch to return mockPosts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockPosts }),
      })
    );

    render(<Home />);

    // Wait for posts to load
    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(mockPosts.length);
    });

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'mountain' } });

    // Advance timers to simulate debounce
    act(() => {
      jest.advanceTimersByTime(500); // Simulate debounce
    });

    await waitFor(() => {
      expect(screen.getByText(/No Search Results Found/i)).toBeInTheDocument();
    });
  });

  // 6. should display fallback message if no posts exist
  it('should display fallback message if no posts exist', async () => {
    // Mock fetch with no posts
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [] }),
      })
    );

    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      expect(screen.getByText(/No Posts Found/i)).toBeInTheDocument();
    });
  });
});
