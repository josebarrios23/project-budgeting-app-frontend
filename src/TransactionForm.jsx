import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TransactionForm = ({ setTransactions, setToggleForm, edit, setEdit }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [transaction, setTransaction] = useState({
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: ""
  });

  function handleChange(e) {
    setTransaction({ ...transaction, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      };

      fetch(`http://localhost:5005/api/transactions/${id}`, options)
        .then((res) => res.json())
        .then((data) => setTransactions(data.transactions))
        .then(() => navigate("/"));
    } else {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      };

      fetch("http://localhost:5005/api/transactions", options)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) alert("All Inputs Must Be Filled");
          else {
            setTransactions(data.transactions);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCancel(){
    navigate("/")
  }

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5005/api/transactions/${id}`)
        .then((res) => res.json())
        .then((data) => setTransaction(data.transaction));
    } else {
        setTransaction({
            item_name: "",
            amount: "",
            date: "",
            from: "",
            category: ""
        });
    }
  }, [id]);

  return (
    <div>
      <h1>Transaction Form</h1>
      <form onSubmit={handleSubmit} className="transaction-form">
        <label htmlFor="item_name">
          Name:
          <input
            onChange={handleChange}
            type="text"
            id="item_name"
            name="item_name"
            value={transaction.item_name}
          />
        </label>
        <label htmlFor="amount">
          Amount:
          <input
            onChange={handleChange}
            type="number"
            id="amount"
            name="amount"
            value={transaction.amount}
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            onChange={handleChange}
            type="date"
            id="date"
            name="date"
            value={transaction.date}
          />
        </label>
        <label htmlFor="from">
          From:
          <input
            onChange={handleChange}
            type="text"
            id="from"
            name="from"
            value={transaction.from}
          />
        </label>
        <label htmlFor="category">
          Category:
          <input
            onChange={handleChange}
            type="text"
            id="category"
            name="category"
            value={transaction.category}
          />
        </label>
        <button>Submit</button>
      </form>
      <button className="nav-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default TransactionForm;
