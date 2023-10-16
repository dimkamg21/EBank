export type TransactionType = 'withdrawal' | 'top-up';

export interface Transaction {
  cardNumber: string,
  type: TransactionType,
  balance: number,
  amount: number,
}