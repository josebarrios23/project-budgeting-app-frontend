import { Link } from "react-router-dom";
import { useEffect } from "react";
import { formatDate } from "./Helpers";
import { transactionTotal } from "./Helpers";

const Transactions = ({ transactions, setTransactions, totalState, setTotalState}) => {

    useEffect(() => {
        const bankTotal = transactionTotal(transactions);
        setTotalState(bankTotal);

    }, [transactions]);

    function handleDelete(id) {
        console.log(id);
        const options = {
            method: "DELETE",
        };

        fetch(`http://localhost:5005/api/transactions/${id}`, options)
            .then((res) => res.json())
            .then((data) => setTransactions(data.transactions));
    }

    return (
        <div className="transaction-list">
            <h1>Transactions</h1>

            {transactions.map(({ id, item_name, category, amount, date }) => (
                <div key={id} className="transaction-item">
                    <Link to={`/${id}`}>
                        <h3 className="item-name">{item_name}</h3>
                    </Link>
                    <p>Category: {category}</p>
                    <p>Date: {formatDate(date)}</p>
                    <p>Transaction Amount: {amount < 0 ? "-$" + Math.abs(amount) : "$" + amount}</p>
                    <Link to={`/edit/${id}`}>
                        <button className="nav-button">Edit</button>
                    </Link>
                    <button className="nav-button" onClick={() => handleDelete(id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Transactions;
