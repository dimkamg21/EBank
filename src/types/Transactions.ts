export type TransactionType = 'withdrawal' | 'top-up' | 'mobile-top-up';

export interface Transaction {
  senderCard: string,
  recipientCard?: string,
  phoneNumber?: string, 
  type: TransactionType,
  balance: number,
  amount: number,
  paymentPurpose?: string
}