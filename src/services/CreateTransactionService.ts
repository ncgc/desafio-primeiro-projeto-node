import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    const result = (type == 'outcome') ? balance.total - value : balance.total + value;

    if(result < 0){
      throw Error('The balance can\'t be negative');
    }

    return this.transactionsRepository.create({title,value,type});
  }
}

export default CreateTransactionService;
