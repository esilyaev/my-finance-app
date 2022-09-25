export enum TransactionType {
  'DEB' = 'Debit',
  'CRE' = 'Credit'
}

export interface ITransaction {
  title: string,
  amount: number,
  type: TransactionType
  date: Date
}