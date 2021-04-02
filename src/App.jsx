import { useState } from 'react';
import './App.css';

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectId: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: 'Dan Abramov, Andrew Clark ',
      num_comments: 3,
      points: 5,
      objectId: 1,
    },
  ];

  // Call back function passed as props to Search Component
  const handleSearch = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} />
      <hr />

      <List list={stories} />
    </div>
  );
};

// creating Search Component
const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearch(event);
  };
  return (
    <>
      <label hrmlFor='search'>Search:</label>
      <input id='search' type='text' onChange={handleChange}></input>
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </>
  );
};

//List Component
const List = ({ list }) => {
  return list.map((item) => {
    return (
      <div key={item.objectId}>
        <a href={item.url}>{item.title}</a>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  });
};

export default App;
