import React, { useEffect, useState } from "react";
import axios from "axios";
import TestsGrid from "./TestsGrid";

const Tests = ({ 
  handleClick, 
  userId, 
  cart, 
  setCart,
  
 }) => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchInitialData() {
        try {
            const response = await axios.get(`http://localhost:3500/gettests`);
            setSearchResults(response.data);
        } catch (error) {
            // console.error(error);
        }
    } 
    fetchInitialData();
  }, []);
  
  return (
    <>
      <div className="container tests-container d-flex">
        <div className="box-right">
          <TestsGrid 
            cart={cart} 
            setCart={setCart} 
            userId={userId} 
            handleClick={handleClick} 
            searchResults={searchResults} 
            cardsPerPage={10}
            
          />
        </div>
      </div>
    </>
  );
};

export default Tests;
