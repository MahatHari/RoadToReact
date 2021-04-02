import './App.css';

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
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <div>
      <h1>Hello World</h1>

      <label hrmlFor='search'>Search:</label>
      <input id='search' type='text' onChange={handleChange}></input>

      <List list={stories}></List>
    </div>
  );
};

export default App;
