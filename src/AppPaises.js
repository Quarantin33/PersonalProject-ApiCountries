import Searcher from "./components/Searcher";
import PaisesHeader from "./components/PaisesHeader";
import Country from "./components/Country";

import "./components/PaisesApp.css"

import {Route,Routes,useNavigate} from "react-router-dom"
import CountryDetails from "./components/CountryDetails";
import { useEffect, useState } from "react";

function AppPaises() {

  //USE STATE OR VARIABLES
  const [darkMode , setDarkMode] = useState(false)
  const [countries, setCountries] = useState([])

  const navigate = useNavigate()

  const noCountries = countries.status || countries.message

  //USE EFFECT
  useEffect(() => {
    try {
      fetchData()
    } catch (error) {
      console.log(error)
    }
  }, [])
  

  //Call to the API
  const fetchData = async () => {

    const response = await fetch("https://restcountries.com/v3.1/all")
    const data = await response.json()

    //Control of the status from the API
    if(data.status === 404){
      setCountries([])
      return
    }

    setCountries(data)
  }


  //Functions
  const switchMode = () => {
     setDarkMode(prevState => !prevState)
  }


  const showDetails = (code) => {
    navigate(`/${code}`)
  }


  return (
    
      <div className={`app ${darkMode ? "darkMode" : ""}`}>
          <PaisesHeader onClick={switchMode} darkMode={darkMode} />
          
          <Routes>
              {/* Ruta de la home */}
              <Route path="/" element={
                  <div className="paises_body">
                    <Searcher darkMode={darkMode} setCountries={setCountries} fetchData={fetchData}/>

                    <div className="countries">
                      {!noCountries ? (countries.map((country) => (
                          <Country darkMode={darkMode}
                            key={country.cca3}
                            name={country.name.official}
                            capital={country.capital}
                            population={country.population}
                            region={country.region}
                            flag={country.flags.png}
                            code={country.cca3}
                            showDetails={showDetails}
                          />
                        ))) : (<p>No countries found...</p>)
                        
                      }
                      
                    </div>

                  </div>
                }
              />

              <Route path="/:countryCode" element={<CountryDetails darkMode={darkMode} 
                    countries={countries} refetch={fetchData}/>}/>

          </Routes>
            

      </div>
      
        
    
  );
}

export default AppPaises;
