import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import "./CountryDetails.css"

import { useParams,useNavigate } from 'react-router-dom'


const CountryDetails = ({darkMode,countries,refetch}) => {

    const params = useParams() //Use the params to find the rigth country
    const navigate = useNavigate()
    
    //Country details

    let name
    let flagImg    
    let population
    let region
    let subregion
    let capital
    let topLevelDomain
    let currencies= []
    let languages = []
    let borders= []
    let nativeName= []

    countries.forEach(country => {

        if(country.cca3 === params.countryCode){

            name=country.name.official
            flagImg=country.flags.png    
            population=country.population
            region=country.region
            subregion=country.subregion
            capital=country.capital
            topLevelDomain=country.tld

            //Fill the nativeNames array
            for (const key in country.name.nativeName) {
                nativeName.push(country.name.nativeName[key].official) //I use the key to find the nativeName
            }

            //Fill the currencies array
            for (const key in country.currencies) {
                currencies.push(country.currencies[key].name) //I use the key to find the name of the currencies
            }
            
            //Fill the languages array
            for (const key in country.languages) {
                languages.push(country.languages[key]) //I use the key to find the name of the languages
                
            }

            //The interrogation sign it is to verify if the array isn't null. The for each it is gonna run only
            //if the array has a least one element
            country.borders?.forEach(border => {
                borders.push(border)
            });


        }
    });

    //Functions
    const goBack = () => {
        navigate("/")
    }

    return (
        <div className='country_details'>


            <button className={`back ${darkMode ? "darkMode" : ""} `} onClick={goBack}>
                <ArrowBackIcon/>
                <p>Go back</p>
            </button>

            <div className="country_details_body">
                <div className="img_container">
                    <img src={flagImg} alt="" />
                </div>

                <div className="info">
                    <h2>{name}</h2>
                    <div className="info_container">

                        <div className="left_info">
                            <p>Native Name: {""}
                                <span className="values">{nativeName[1] ? nativeName[1] : nativeName[0] }</span>
                            </p>

                            <p>Population: {""}
                                <span className={`values ${darkMode ? "darkMode" : ""} `}>{population}</span>
                            </p>

                            <p>Region: {""}
                                <span className={`values ${darkMode ? "darkMode" : ""} `}>{region}</span>
                            </p>

                            <p>Sub Region: {""}
                                <span className={`values ${darkMode ? "darkMode" : ""} `}>{subregion!=null ? subregion : "Doesn't have"}</span>
                            </p>

                            
                        </div>

                        <div className="rigth_info">
                            <p>Capital: {""}
                                <span className={`values ${darkMode ? "darkMode" : ""} `}>{capital}</span>
                            </p>

                            <p>Top-level Domain: {""}
                                <span className={`values ${darkMode ? "darkMode" : ""} `}>{topLevelDomain}</span>
                            </p>

                            <p>Currencies: {""}
                                
                                {
                                    currencies.map(currency=>{

                                        if(currencies.indexOf(currency)!== currencies.length){
                                            return(
                                                <span key={currency} className={`values ${darkMode ? "darkMode" : ""} `}>
                                                    {""}
                                                    {currency},
                                                </span>
                                            )
                                            
                                        }else{
                                            return(
                                                <span className={`values ${darkMode ? "darkMode" : ""} `}>
                                                    {""}
                                                    {currency},
                                                </span>
                                            )
                                        }

                                    })
                                }

                                
                            </p>

                            <p>Languages: {""}

                                
                                {
                                    languages.map(language=>{

                                        if(languages.indexOf(language)!== languages.length){
                                            return(
                                                <span key={language} className={`values ${darkMode ? "darkMode" : ""} `}>
                                                    {""}
                                                    {language},
                                                </span>
                                            )
                                            
                                        }else{
                                            return(
                                                <span className={`values ${darkMode ? "darkMode" : ""} `}>
                                                    {""}
                                                    {language},
                                                </span>
                                            )
                                        }

                                    })
                                }
                                
                            </p>

                        </div>

                    </div>

                            Border Countries:

                            {
                                borders.length ? (
                                    borders.map(border =>(
                                        <div key={border} className={`border_country ${darkMode ? "darkMode" : ""} `} 
                                             onClick={() => 
                                             {refetch()
                                             navigate(`/${border}`)}
                                             }>
                                                <p>{border}</p>
                                        </div>
                                    ))

                                ) : (
                                    <div key={"border"} className={`values ${darkMode ? "darkMode" : ""} `}>
                                                <p>No borders...</p>
                                    </div>
                                )

                                        
                                    
                            }
                    
                </div>
            </div>

        </div>
    )
}

export default CountryDetails