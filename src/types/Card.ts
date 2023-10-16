export interface Card {
  cardNumber: string,
  holderName: string,
  monthExpire: string,
  yearExpire: string,
  cvv: string,
  balance:  number,
}

export type TransactionType = 'withdrawal' | 'top-up';

export interface Transaction {
  cardNumber: string,
  type: TransactionType,
  balance: number,
  amount: number,
}