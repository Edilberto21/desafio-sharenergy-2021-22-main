import "./App.css";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from "./Header/Header";
import Routes from "./Routes/Routes"
import { BrowserRouter } from "react-router-dom";
function App () {
  return(
    <div>
      <BrowserRouter>
        <Header/>
        <Routes/>
        </BrowserRouter>
    </div>
  )
}

export default App;
