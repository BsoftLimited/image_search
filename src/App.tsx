import { Form } from 'react-bootstrap';
import './index.css';
import React, { useRef, useState } from 'react';

const App = () => {
  const searchInput = useRef<HTMLInputElement| null>(null);
  const [query, setQuery] = useState<string>();

  const handleSearch = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submitted');
  };

  const handleSelection = (selection: string) => {
    setQuery(selection);
  }

  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control type='search' placeholder='Type something to search...' className='search-input' value={query} ref={searchInput} />
        </Form>
      </div>
      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>
    </div>
  );
};

export default App;