import React, { useState } from 'react';

export default function ComponentCompostion() {
  const onSubmit = (username) => console.log(username);
  const [username, setUsername] = useState('');
  return (
    <Form
      onSubmit={(event) => {
        onSubmit(username);
        event.preventDefault();
      }}
    >
      <InputField value={username} onChange={setUsername}>
        Your Name:
      </InputField>
      <Button color='violet' type='submit'>
        Send
      </Button>
    </Form>
  );
}

const Form = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

const Button = ({ color = 'blue', type = 'button', onClick, children }) => {
  return (
    <button style={{ backgroundColor: color }} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

const InputField = ({ value, onChange, children }) => (
  <label>
    {children}
    <input
      type='text'
      value={value}
      onChange={(event) => onChange(event.target.value)}
    ></input>
  </label>
);
