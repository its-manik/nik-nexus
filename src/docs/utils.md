# Utility Functions

## formatAddress
Format Ethereum addresses with ellipsis.

```typescript
function formatAddress(address: string, length = 4): string
```

Example:
```typescript
formatAddress('0x1234567890abcdef1234567890abcdef12345678')
// Returns: '0x1234...5678'
```

## formatNumber
Format numbers with locale-specific separators.

```typescript
function formatNumber(value: number | string): string
```

Example:
```typescript
formatNumber(1234567.89)
// Returns: '1,234,567.89'
```

## formatDate
Format dates consistently.

```typescript
function formatDate(date: string | Date): string
```

Example:
```typescript
formatDate('2024-03-14T12:00:00Z')
// Returns: '3/14/2024, 12:00:00 PM'
```

## formatEther
Format Wei values to Ether with specified decimals.

```typescript
function formatEther(value: string | number, decimals = 4): string
```

Example:
```typescript
formatEther('1000000000000000000')
// Returns: '1.0000'
```

## classNames
Combine CSS class names conditionally.

```typescript
function classNames(...classes: (string | undefined | null | false)[]): string
```

Example:
```typescript
classNames('base-class', isActive && 'active', error && 'error')
// Returns: 'base-class active' (if isActive is true and error is false)
```