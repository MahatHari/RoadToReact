import React, { useState } from 'react';

export default function RenderProps() {
  return (
    <div>
      <h1>Dollor to Euro </h1>
      <Amount render={(amount) => <Euro amount={amount} />} />

      <h1> Dollar to Pound</h1>
      <Amount render={(amount) => <Pound amount={amount} />} />
    </div>
  );
}

const Amount = ({ render }) => {
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
      {render(amount)}
    </div>
  );
};
const Euro = ({ amount }) => <p>Euro: {amount * 0.876}</p>;
const Pound = ({ amount }) => <p> Pound: {amount * 0.76}</p>;
