// '?search=estudar' -> { search: 'estudar' }
export function extractQueryParams(query) {
  return Object.fromEntries(new URLSearchParams(query))
}
