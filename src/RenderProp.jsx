import React, { Children, useState } from 'react';

export default function RenderProps() {
  return (
    <div>
      <h1>Dollor to Euro </h1>
      <Amount renderFunction={(amount) => <Euro amount={amount} />} />
      <h1> Dollar to Pound</h1>
      <Amount renderFunction={(amount) => <Pound amount={amount} />} />
      {/* Above can be refactored as having the children as function */}
      {/*   <h1>Dollor to Euro </h1>
      <Amount> {(amount) => <Euro amount={amount} />}</Amount>
      <h1> Dollar to Pound</h1>
      <Amount>{(amount) => <Pound amount={amount} />} </Amount> */}
    </div>
  );
}

const Amount = ({ renderFunction }) => {
  const [amount, setAmount] = useState(0);

  const onIncrement = () => setAmount(amount + 1);
  const onDecrement = () => setAmount(amount > 0 ? amount - 1 : amount);

  return (
    <div>
      <button type='button' onClick={onIncrement}>
        +
      </button>
      <button type='button' onClick={onDecrement}>
        -
      </button>
      <p>US Dollar: {amount}</p>
      {/* renderFunction is a javascript function that renders another component
           Here Render takes amount and pases it to Euro/Pound component as props
          */}
      {renderFunction(amount)}
    </div>
  );
};
const Euro = ({ amount }) => <p>Euro: {amount * 0.876}</p>;
const Pound = ({ amount }) => <p> Pound: {amount * 0.76}</p>;
