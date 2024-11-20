export function formatAddress(address: string, length = 4): string {
  if (!address) return '';
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
}

export function formatNumber(value: number | string): string {
  return new Intl.NumberFormat().format(Number(value));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleString();
}

export function formatEther(value: string | number, decimals = 4): string {
  const num = typeof value === 'string' ? Number(value) : value;
  return (num / 1e18).toFixed(decimals);
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}