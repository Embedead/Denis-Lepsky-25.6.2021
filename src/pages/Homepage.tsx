import React from "react"
// import axios from "axios"
import styled from "styled-components"
import {WeatherHeader} from '../components/header/index'
// import {getSearchResults}  from "../api/constants"

const HomepageContainer = styled.div`
    position: absolute;
    background-color: #F2C760;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

export const Homepage = () =>{
    return(
        <HomepageContainer>
            <WeatherHeader/>
        </HomepageContainer>
    )
}