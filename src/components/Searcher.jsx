import React from 'react'


import "./Searcher.css"
import SearchIcon from "@mui/icons-material/Search"
import { useRef } from "react";

const Searcher = ({darkMode,setCountries,fetchData}) => {


  const countriesInputRef = useRef() //Se usan para hacer referencia a un elemento jsx
  const regionRef = useRef()

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value

    
  if(searchValue.trim()){
      const fetchSearch = async () => {
        const response = await fetch (`https://restcountries.com/v3.1/name/${searchValue}`)
        const data = await response.json()
        setCountries(data)
      }

      try {
        fetchSearch()
      } catch (error) {
        console.log(error)
      }

    }else {
      fetchData()
    }
  } 
  


  const selectRegion = () => {

    const selectValue = regionRef.current.value 

    if(selectValue.trim()){

        if(selectValue === "ALL"){

            try {
              fetchData()
            } catch (error) {
              console.log(error)
            }
            return
    
        }

        const fetchSelect = async () => {

            const response = await fetch (`https://restcountries.com/v3.1/region/${selectValue}`)
            const data = await response.json()
            setCountries(data)
          
        }

        try {
          fetchSelect()
        } catch (error) {
          console.log(error)
        }
    }   

  }
  



  return (
    <>
        <div className='inputs'>
            <div className={`search_input ${darkMode ? "darkMode" : ""}`}>
                <SearchIcon/>
                <input type="text" placeholder='Search for a country...' ref={countriesInputRef} onChange={searchCountries}/>
            </div>
          
          
          <div className={`select_region ${darkMode ? "darkMode" : ""}`}>
                <select ref={regionRef} onChange={selectRegion}>
                    <option>ALL</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
                
          </div>
        </div>
    </>
  )
}

export default Searcher