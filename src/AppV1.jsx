import React, {
  useState,
  useEffect,
  useReducer,
  useRef,
  useCallback,
} from 'react';
import axios from 'axios';
import './App.css';
import { sortBy } from 'lodash';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// custom hooks
const useSemiPersistenState = (key, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

// reducer
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};
// APP Comoponent
const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistenState('search', 'react');

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [urls, setUrls] = useState([`${API_ENDPOINT}${searchTerm}`]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    const url = `${API_ENDPOINT}${searchTerm}`;
    setUrls(urls.concat(url));
  };
  const extractSearchTerm = (url) => url.replace(API_ENDPOINT, '');
  const getLastSearches = (urls) =>
    urls.slice(-5).map((url) => extractSearchTerm(url));
  const handleLastSearch = (searchTerm) => {
    const url = `${API_ENDPOINT}${searchTerm}`;
    setUrls(urls.concat(url));
  }; //TODO:

  const lastSearches = getLastSearches(urls);

  /* // Data fetching logic to a stand alone function outise side effect
  const handleFetchStories = useCallback(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({
          type: 'STORIES_FETCH_FAILURE',
        })
      );
  }, [url]); */

  // Data Fetching with axios
  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({
        type: 'STORIES_FETCH_FAILURE',
      });
    }
  }, [urls]);

  // using useCallback() in useEffect
  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  /*  // Data Fetching using Browsers Fetch API
  // User dispatcher for change is reducer state
  useEffect(() => {
    if (!searchTerm) return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' }));
  }, [searchTerm]); */

  // handling for remove story
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  /* // search handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }; */

  // filter stories for searched story
  /*   const searchedStories = stories.data.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); */

  return (
    <div className='container'>
      <h1 className='headline-primary'>My Hacker Stories</h1>
      <InputWithLabel
        id='search'
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search: </strong>
      </InputWithLabel>
      <button
        type='button'
        className='button button_large'
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>
      {lastSearches.map((searchTerm) => (
        <button
          key={searchTerm}
          type='button'
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}

      <hr />

      {stories.isError && <p>Something went wrong .....</p>}

      {stories.isLoading ? (
        <p>Loading .... </p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);
  return (
    <>
      <label htmlFor={id} className='label'>
        {children}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onInputChange}
        className='input'
      />
    </>
  );
};

// Sorting Object Dictionary
const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  AUTHOR: (list) => sortBy(list, 'author'),
  COMMENTS: (list) => sortBy(list, 'num_comments'),
  POINTS: (list) => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemoveItem }) => {
  const [sort, setSort] = useState({ sortKey: 'NONE', isReverse: false });
  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey: sortKey, isReverse: isReverse });
  };
  const sortFunction = SORTS[sort.sortKey];
  // Sorting with reverse
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          textAlign: 'left',
          flexDirection: 'row',
          justifyItems: 'center',
        }}
      >
        <span
          style={{
            width: '40%',
            textAlign: 'left',
            padding: '5px',
            fontSize: '24px',
          }}
        >
          <button type='buttton' onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span
          style={{
            width: '30%',
            textAlign: 'left',
            padding: '5px',
            fontSize: '24px',
          }}
        >
          <button type='buttton' onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span
          style={{
            width: '10%',
            textAlign: 'left',
            padding: '5px',
            fontSize: '24px',
          }}
        >
          <button type='buttton' onClick={() => handleSort('COMMENTS')}>
            Comments
          </button>
        </span>
        <span
          style={{
            width: '10%',
            textAlign: 'left',
            padding: '5px',
            fontSize: '24px',
          }}
        >
          <button type='buttton' onClick={() => handleSort('POINTS')}>
            Points
          </button>
        </span>
        <span
          style={{
            width: '10%',
            textAlign: 'left',
            padding: '5px',
            fontSize: '24px',
          }}
        >
          Actions
        </span>
      </div>
      {sortedList.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        ></Item>
      ))}
    </div>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <div className='item'>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}> {item.num_comments} </span>
    <span style={{ width: '10%' }}> {item.points} </span>
    <span style={{ width: '10%' }}>
      <button className='button' onClick={() => onRemoveItem(item)}>
        Dismiss
      </button>
    </span>
  </div>
);
export default App;
