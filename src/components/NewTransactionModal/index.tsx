import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { BaseSyntheticEvent, useCallback, useState } from 'react';
import { api } from '../../services/api';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const [type, setType] = useState('deposit');

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    const handleNewTransaction = useCallback((e: BaseSyntheticEvent) => {
        e.preventDefault();
        // window.confirm('Certeza que quer cadastrar?')
          const data = {
                title,
                category,
                value,
                type,
            }
            api.post('/transactions', data)
        clearFields()
        // e.target.reset()
    }, [title, category, value, type])

    function clearFields() {
        setCategory('')
        setTitle('')
        setValue(0)
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                type='button'
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleNewTransaction}>
                <h2>Cadastrar transação</h2>
                <input
                    type="text"
                    placeholder='Título'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder='Valor'
                    value={value}
                    onChange={e => setValue(Number(e.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('deposit') }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type='button'
                        onClick={() => { setType('withdraw') }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>

                </TransactionTypeContainer>
                <input
                    placeholder='Categoria'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}