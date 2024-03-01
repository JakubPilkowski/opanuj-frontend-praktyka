export default function countrySorting(items: any[], sortBy?: string): any[] {
  const sortKey = sortBy?.replace(/^-/, '');
  const order = sortBy?.startsWith('-') ? 'desc' : 'asc';

  if (!sortKey) {
    return items;
  }

  const sortedData = [...items].sort((a, b) => {
    if (a[sortKey] > b[sortKey]) {
      return order === 'asc' ? 1 : -1;
    }
    if (a[sortKey] < b[sortKey]) {
      return order === 'asc' ? -1 : 1;
    }
    return 0;
  });

  return sortedData;
}
