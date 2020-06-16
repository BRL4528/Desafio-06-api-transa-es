import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transactions,
      balance,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Buscando no request todos os valores para a criação
    const { title, value, type } = request.body;

    // passa os valores para o repositorio
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    // Executa o metodo execute() que é responsavel pela criação
    const trasaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(trasaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
