import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal';
import { Header } from "./components/Header";
import { GlobalStyles } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {TransactionProvider} from './TransactionContext'

Modal.setAppElement('#root');

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewtransactionModal() {
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewtransactionModal() {
    setIsNewTransactionModalOpen(false)
  }
  return (
   <TransactionProvider>
      <Header onOpenNewTransactionModal={handleOpenNewtransactionModal} />
      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewtransactionModal}
      />

      <GlobalStyles />
    </TransactionProvider>
  );
}
