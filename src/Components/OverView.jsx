import { useState } from "react"
import "./Overview.css"

const AddTransactionView=(props)=>{
    const [amount,setAmount]=useState();
    const [desc,setDesc]=useState();
    const [type,setType]=useState("EXPENSE");

 const addTransaction=()=>{
    props.addTransaction({amount:Number(amount),desc,type,id:Date.now()})
    props.toggleTranaction();
 }

   return(
    <div className="addTransContainer">
      <input type="number" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
      <input type="text" placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
      <div className="RadioBox">
        <input type="radio" name="type" id="expense" value="EXPENSE" checked={type==="EXPENSE"} onChange={(e)=>setType(e.target.value)}/>
        <label htmlFor="expense">Expense</label>
        <input type="radio" name="type" id="income" value="INCOME" checked={type==="INCOME"} onChange={(e)=>setType(e.target.value)} />
        <label htmlFor="expense">Income</label>
      </div>
      <button className="AddTran" onClick={addTransaction}>Add Transaction</button>
    </div>
   )
}
const OverviewComponent=(props)=>{
    const [addTranVisible,toggleTranaction]=useState(false)
    return (
        <div className='containerOverview'>
            <div className="balnceBox">
                Balance:${props.income-props.expense}
                <button className="AddTran" onClick={()=>toggleTranaction(!addTranVisible)}>{addTranVisible ?"Cancel":"ADD"}</button>
            </div>
            {addTranVisible&&<AddTransactionView toggleTranaction={toggleTranaction} addTransaction={props.addTransaction}></AddTransactionView>}
           <div className="expenseContainer">
            <div className="expenseBox" isIncome={true}>
                Expense <span style={{color:"red"}}> ${props.expense}</span>
            </div>
            <div className="expenseBox" isIncome={true}>
                Income <span style={{color:"rgb(9, 219, 9)"}}>${props.income}</span>
            </div>
           </div>
        </div>
    )
}
export default OverviewComponent