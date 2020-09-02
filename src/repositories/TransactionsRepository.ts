import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes =  this.sumByType('income');
    const outcomes = this.sumByType('outcome');
    const total = incomes - outcomes;
    return  {income: incomes, outcome: outcomes, total: total};
  }

  public create({title, value, type}:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }

  private findByType(type: string): Transaction[] | null {
    const transactions =  this.transactions.filter(transaction => (type == transaction.type));
    return transactions || null;
  }

  private sumByType(type: string){
    let sum = 0;
    if (type == 'income' || type == 'outcome'){
      const transactions = this.findByType(type);
      if (transactions != null) {
        transactions.forEach(transaction => {
          sum += transaction.value;
        });
      }
    }
    return sum;
  }
}

export default TransactionsRepository;
