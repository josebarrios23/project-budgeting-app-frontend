import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Transactions from "./Transactions";
import TransactionDetails from "./TransactionDetails";
import TransactionForm from "./TransactionForm";
import Nav from "./Nav";
import "./App.css"

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [toggleDetails, setToggleDetails] = useState({ show: false, id: null });
  const [toggleForm, setToggleForm] = useState(false);
  const [edit, setEdit] = useState({ show: false, id: null });
  const [totalState, setTotalState] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5005/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data.transactions));
  }, []);

  return (
    <div>
      <Nav
      totalState={totalState}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Transactions
              setToggleDetails={setToggleDetails}
              transactions={transactions}
              setTransactions={setTransactions}
              edit={edit}
              setEdit={setEdit}
              totalState={totalState}
              setTotalState={setTotalState}
            />
          }
        />
        <Route
          path="/:id"
          element={<TransactionDetails toggleDetails={toggleDetails} />}
        />
        <Route
          path="/edit/:id"
          element={
            <TransactionForm
              edit={edit}
              setEdit={setEdit}
              setTransactions={setTransactions}
              setToggleForm={setToggleForm}
            />
          }
        />
        <Route
          path="/new"
          element={
            <TransactionForm
              edit={edit}
              setEdit={setEdit}
              setTransactions={setTransactions}
              setToggleForm={setToggleForm}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;