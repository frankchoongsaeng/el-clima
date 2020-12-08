import { useState } from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  border: 1px solid white;
  border-radius: 0;
  outline: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 0;
  max-width: 750px;
  width: 100%;
`;

const Input = styled.input`
  border: 0;
  border-radius: 0;
  padding: 0px 20px;
  outline: none;
  background: none;
  caret-color: white;
  color: white;
  flex-grow: 1;
`;

const SearchButton = styled.button`
  border: 1px solid white;
  border-radius: 0;
  display: flex;
  padding: 8px 15px;
  outline: none;
  background: white;
  color: black;
  font-size: 140%;
  overflow: hidden;
  cursor: pointer;
  transition: color 0.2s linear;
  :hover {
    color: blue
  }
  i {
    transform: scale(1.5);
  }
`;


export default function SearchBar({ onSearch }) {

  const [searchQuery, setSearchQuery] = useState("Accra")

  return (
    <>
      <SearchWrapper className="mb-50">
        <Input 
          autoFocus 
          placeholder="Search a location" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          onKeyUp={(e) => { return e.code === "Enter" ? onSearch(searchQuery) :  "" }} />
        <SearchButton onClick={() => { onSearch(searchQuery) }}><i className='bx bx-search-alt'></i></SearchButton>
      </SearchWrapper>
    </>
  )
}