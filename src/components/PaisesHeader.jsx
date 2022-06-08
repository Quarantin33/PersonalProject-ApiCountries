import React from 'react'
import DarkModeIcon from "@mui/icons-material/DarkMode"

import "./PaisesHeader.css"

const PaisesHeader = ({onClick,darkMode}) => {
  return (
    <div className={`header ${darkMode ? "darkMode" : ""}`}>

      <div className="header_container">
        <h2 className="logo">Where in the world</h2>
          <div className="switch-mode" onClick={onClick}>
              <DarkModeIcon/>
              <h3 >Dark Mode</h3>
          </div>
      </div>
           
    </div>
  )
}

export default PaisesHeader