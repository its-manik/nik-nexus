# Accounts API

## Get Accounts
Retrieve a paginated list of accounts.

```typescript
GET /api/accounts
```

Query Parameters:
- `page` (number, optional): Page number (default: 0)
- `limit` (number, optional): Items per page (default: 10)

Response:
```typescript
{
  accounts: Array<{
    id: string;
    datetime_added: string;
    name: string;
    is_multisig: boolean;
    api_key: string;
    balance: string;
    total_fees_paid: string;
    available_fee_balance: string;
    round_earnings: string;
  }>;
  total: number;
}
```

## Get Account Details
Retrieve details for a specific account.

```typescript
GET /api/accounts/:id
```

Response:
```typescript
{
  player: {
    id: string;
    datetime_added: string;
    name: string;
    is_multisig: boolean;
    api_key: string;
  };
  balance_data: {
    eth_block_num: string;
    balance: string;
  };
  round_earnings: {
    round_earnings: string;
  };
  state: {
    total_fees_paid: string;
    available_fee_balance: string;
  };
}
```