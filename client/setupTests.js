// Mock global alert to avoid jsdom not-implemented error
beforeEach(() => {
  window.alert = jest.fn(); // Prevents the "Not implemented" error
});
