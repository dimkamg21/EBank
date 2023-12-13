export type TransactionType = 'withdrawal' | 'top-up' | 'mob-up';

export interface Transaction {
  user_id: string,
  senderCard: string,
  recipientCard?: string,
  phoneNumber?: string, 
  type: TransactionType,
  // balance: number,
  amount: number,
  details?: string
}