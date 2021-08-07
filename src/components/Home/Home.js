import React, { useState, useEffect,useCallback } from 'react'
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader"
import { css } from "@emotion/react";
const override = css`
  display:center;
  left:50;
  top:50;


 height:100vh;
 width:100%;
  border-color: red;
`;

const Home = () => {
  const [error, setError] = useState(null);
  const [Countrys, setCountrys] = useState([]);
  const [loading, setLoading] = useState(false);


  const getCountrys = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://restcountries.eu/rest/v2/region/Asia')
      if (!response.ok) 
      {
        throw new Error(" Something went Worng!")
      }
      setCountrys(await response.json());
    }
    catch (error) {
      setError(error.message);
    }
    setLoading(false)
  }, [])

useEffect(() => {
  getCountrys();
}, [getCountrys]);

return (
  <> <Nab><Btn onClick={getCountrys}>Refresh</Btn></Nab>
    {!loading && Countrys.length > 0 &&
      (<Main>
        {
          Countrys.map((curElem) => {
            return (

              <Card>
                <NameContainer>
                  <h2>country name {curElem.name}</h2>
                  <h3> capital name  {curElem.capital}</h3>

                </NameContainer>
                <ImgContainer>
                  <img src={curElem.flag} alt="flag" />
                </ImgContainer>
                <DataContainer>
                  <h2>{curElem.region}</h2>
                  <h2>{curElem.subregion}</h2>
                  <h2>population {curElem.population}</h2>
                  <h2>borders</h2>
                  <Brd>{curElem.borders.map((borders) => <div>{borders}</div>)}</Brd>
                  <h2>languages</h2>
                  <Lan> {curElem.languages.map(element => <li>{element.name}</li>)}</Lan>
                </DataContainer>
              </Card>


            )
          })
        }
      </Main>)}
    {
      !loading && Countrys.length === 0 && <h2>Found no items</h2>
    }
    {
      loading && <HashLoader color={"orange"} loading={loading} css={override} size={90} />
    }
  </>


)
}

export default Home
const Main = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 44px;
    align-self: center;
    justify-content: center;
`
const Card = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin:10px;
width:400px;
height:450px;
background-color:white;
overflow: hidden;
box-shadow: 0 2px 20px #787878;
 ${'' /* border-radius: 25px; */}
 cursor: pointer;
 transition: transform 200ms ease-in;

`
const ImgContainer = styled.div`
img{
height:130px;
width:250px;

}


`
const NameContainer = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');
font-family: 'Yeseva One', cursive;
height:70px;
font-size:8px;
text-transform:uppercase;
text-shadow: #FC0 1px 0 10px;

`
const DataContainer = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');
font-family: 'Yeseva One', cursive;
height:250px;
font-size:8px;
text-transform:uppercase;

`
const Brd = styled.div`

    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    div{text-shadow: #FC0 1px 0 10px;
        padding:4px;
        font-family: 'Yeseva One', cursive;
        font-weight:bold;
    }
}
`
const Lan = styled.div`

    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    li{text-shadow: #FC0 1px 0 10px;
        padding:4px;
        font-family: 'Yeseva One', cursive;
        font-weight:bold;
    }
}
`
const Nab = styled.div`{
    width:100%;
    height:60px;
    background-color:black;
    display:flex;
    align-items:center;
    justify-content:center;
}
`
const Btn = styled.button`
  color:white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  cursor:pointer;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover{
 border-color:transparent;
  opacity: 1;
  transition-duration: 1s;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
}

&:hover{

  z-index: 1;
  animation: glow 8s linear infinite;
    
}
@keyframes glow {
  0%{
    background-position: 0%;
  }
  100%{
    background-position: 400%;
  }
}
`;


