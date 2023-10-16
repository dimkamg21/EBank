export interface Card {
  cardNumber: string,
  holderName: string,
  monthExpire: string,
  yearExpire: string,
  cvv: string
}

export type TransactionType = 'withdrawal' | 'top-up';

export interface Transaction {
  cardNumber: string,
  type: TransactionType,
  amount: number,
}