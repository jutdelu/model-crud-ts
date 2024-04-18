import { error } from 'console';
import { Transaction, TransactionType } from './entities';
import { get } from 'http';


class TransactionUseCases {
    private transactionsInMemory: Transaction [] = [];
    
    createTransaction (amount: number, type: TransactionType){
        const transaction = new Transaction(amount, type);
        this.transactionsInMemory.push(transaction);
    }

    readAllTransactions () {
        const transactions = this.transactionsInMemory;
        return transactions;
    }

    readTransaction (id: string) {
        const transaction = this.transactionsInMemory.find((tr) => tr.getId()=== id);
        if (!transaction) throw new Error("Not Found");
        return transaction;
    }

    updateTransaction (
        id: string, 
        values: {amount?: number, type?: TransactionType}) {
        const updateTransactions = this.transactionsInMemory.map(tr => {
            if (tr.getId() === id){
                const newAmout = values.amount || tr.getAmount();
                const newType = values.type || tr.getType();
                const newTransaction = new Transaction(newAmout, newType);
                newTransaction.setId(tr.getId());
            return newTransaction;
            }       
        return tr;
        });
        this.transactionsInMemory = updateTransactions;
    }

    deleteTransaction (id: string) {
       const updateTransactions = this.transactionsInMemory.filter((tr) => tr.getId() !== id);
       this.transactionsInMemory = updateTransactions; 
    }
    
}