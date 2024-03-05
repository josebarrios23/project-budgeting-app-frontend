import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "./Helpers";

const TransactionDetails = () => {
  const { id } = useParams();

  const [transactionDetail, setTransactionDetail] = useState();

  useEffect(() => {
    fetch(`http://localhost:5005/api/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setTransactionDetail(data.transaction));
  }, [id]);

  if (!transactionDetail) return null;
  return (
    <div className="transaction-details">
      <h1>Transaction Details</h1>
      <p>"{transactionDetail.item_name}"</p>
      <p>Transaction Amount: {transactionDetail.amount < 0 ? "-$" + Math.abs(transactionDetail.amount) : "$" + transactionDetail.amount}</p>
      <p>Transaction Type: {transactionDetail.amount < 0 ? "DEDUCTION/WITHDRAWL" : "DEPOSIT"}</p>
      <p>Date of Transaction: {formatDate(transactionDetail.date)}</p>
      <p>From: {transactionDetail.from}</p>
      <p>Category: {transactionDetail.category}</p>
        <Link to="/">
           <button className="nav-button">Home</button>
        </Link>
        <Link to={`/edit/${id}`}>
           <button className="nav-button">Edit</button>
        </Link>
    </div>
  );
};

export default TransactionDetails;