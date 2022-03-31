import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from './services/api'

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    type: string;
    createdAt: string
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactioContext = createContext<Transaction[]>([]);

export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    return (
        <TransactioContext.Provider value={transactions}>
            {children}
        </TransactioContext.Provider>
    )
}