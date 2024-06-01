import React from 'react'
import {FaSearch} from "react-icons/fa";

export const SearchBar = ({search, searchCrypto}) => {

  return (
    <div className='searchBar-input-wrapper'>
        <FaSearch id="searchBar-icon" />
        <input onChange={searchCrypto} value={search} id='searchBar-input' name='searchBar' placeholder='Buscar activos...'></input>
    </div>
  )
}
