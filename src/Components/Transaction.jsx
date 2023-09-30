import React from 'react'
import "./Transaction.css"
import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
const Cell = styled.div`
display: flex;
flex-direction: row;
padding: 10px 15px;
font-size: 14px;
border-radius: 2px;
align-items: center;
border: 1px solid black;
font-weight: normal;
border-right:4px solid ${(props) => (props.isExpense ? "red" : "rgb(9, 219, 9)")};
justify-content: space-between;

width: 100%;
`;
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload.desc}</span>
      <span>${props.payload.amount}</span>
    </Cell>
  );
};
export default function TransactionComponent(props) {
  const [searchText, updateSearchText] = useState("");
  const [filterTrans, updateTxn] = useState(props.transactions);

  const filterData = () => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) => payload.desc.toLowerCase().includes(searchText.toLocaleLowerCase().trim()));
    updateTxn(txn)
  }


  useEffect(() => filterData(searchText, [props.transactions]))
  return (
    <div className='TransContainer'  >
      Transaction
      <input type="text" placeholder='Search' value={searchText} onChange={(e) => { updateSearchText(e.target.value); filterData(e.target.value) }} />
      {filterTrans?.length ? filterTrans.map((payload) =>
        <TransactionCell payload={payload} />
      ) : ""}
    </div>
  )
}
