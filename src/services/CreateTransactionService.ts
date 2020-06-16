// Repository, responsavel por lidar com todos os dados
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Reques {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Reques): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transacion type is invalid');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    const trasaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return trasaction;
  }
}

export default CreateTransactionService;
