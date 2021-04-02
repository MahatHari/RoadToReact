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

  // Lifted State
  // Initial state of searchTerm is set to React
  // by using controlled component, input field
  // starts with correct initial value, using the searchTerm
  // from reat State,
  const [searchTerm, setSearchTerm] = useState('React');
  // Call back function passed as props to Search Component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <Search onSearch={handleSearch} search={searchTerm} />
      <hr />

      <List list={searchedStories} />
    </div>
  );
};

// creating Search Component
// 1. Props are destructured
const Search = ({ search, onSearch }) => {
  return (
    <>
      <label hrmlFor='search'>Search:</label>
      {/* Making Search component with its input field into a controlled component */}
      {/* By adding value attribute and assigning from state object, it will shouw current search term */}
      <input id='search' type='text' onChange={onSearch} value={search}></input>
      <p>
        Searching for <strong>{search}</strong>
      </p>
    </>
  );
};

//List Component
const List = ({ list }) => {
  // List is broken into another Item component
  /* return list.map((item) => {
    return (
      <div key={item.objectId}>
        <a href={item.url}>{item.title}</a>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    );
  }); */
  // Vartion 2: Spread and Rest Operators
  // 2.Iterations
  return list.map((item) => <Item key={item.id} {...item} />);
};

// Extracting a New Item component to simplify List component
const Item = ({ title, url, author, num_comments, points }) => {
  return (
    <>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span> {num_comments} </span>
      <span> {points}</span>
    </>
  );

  /* Nester Destructuring Variation 1 */
  /* 
  const Item= ({
  item:{
  title,
  url, author, 
  num_comments, 
  points
  }
  })=><>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{authro}</span>
      <span> {num_comments} </span>
      <span> {points}</span>
    </>
  
  */
  /* Variation 2: Spread and Rest Operators */
  /* 1. Iteration  */
  /* 
  const List= ({list})=>
  list.map(item=>(<Item
  key={item.ObjectId}
  title={item.title}
  url=i{tem.url}
  author={item.author}
  num_comments={item.num_comments}
  points={item.points}
  />));

  const Item=({title, url, author, num_comments, points})=>(
  <>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{authro}</span>
      <span> {num_comments} </span>
      <span> {points}</span>
    </>
  )
  
  */
  //
};

export default App;
