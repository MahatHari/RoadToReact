import { useEffect, useState } from 'react';
import './App.css';

//Creating semi Persistent Custom hooks
// making is re-usable with general value and setValue parameters
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

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
  // Using local storage for last search if there is, if not our default
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  // // Using React's useEffect to trigger the side-effect each time
  // // the searchTerm changes
  // useEffect(() => {
  //   localStorage.setItem('search', searchTerm);
  // }, [searchTerm]);
  // // Call back function passed as props to Search Component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    /* //setting local Storage for searchTerm
    localStorage.setItem('search', event.target.value);
    Used Reacts sideEffect Hook to do this
    */
  };
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      {/* <Search onSearch={handleSearch} search={searchTerm} /> */}
      <InputWithLable
        id='search'
        label='Search'
        value={searchTerm}
        onInputChanage={handleSearch}
      />
      <hr />

      <List list={searchedStories} />
    </div>
  );
};

// creating Search Component
// 1. Props are destructured
// The seacrh Component is generalised as InputWith Label
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

// Generalizing the above search component to re usaual general
// Input component with Lable

const InputWithLable = ({
  id,
  label,
  type = 'text',
  value,
  onInputChanage,
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChanage} />
  </>
);

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
  // Variations 2: Spread and Rest operartors final
  // here in {objectId, ...item} => ...item means rest operator
  return list.map(({ objectId, ...item }) => <Item key={objectId} {...item} />);
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
