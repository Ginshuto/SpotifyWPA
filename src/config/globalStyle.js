import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
/* You can add global styles to this file, and also import other style files */

body {
  height: 100%;
  color: ${({ theme }) => theme.fontColor};
  background: linear-gradient(${({ theme }) => theme.gradient1}, ${({
  theme
}) => theme.gradient2}) no-repeat center center fixed;
  background-size: cover;
  padding: 5%;
}


* {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

h1{
  width: 100%;
  color: #1DB954;
  text-transform: uppercase;
  text-align: center;
}
  
h2,
h3,
h4 {
  color: #1DB954;
  margin-bottom: 5px;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  margin: 5px 0 5px 0;
  cursor: pointer;
  width: 100%;
}

li::before {
  content: "♪";
  color: ${({ theme }) => theme.symbolColor};
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

input {
  margin: 5px 15px 15px 0;
  letter-spacing: 1px;
}

input[type="text"] {
  background-color: transparent;
  color: ${({ theme }) => theme.fontColor};
  border: 1px solid #1DB954;
  padding: 10px;
  border-radius: 4px;
  margin: 0 10px 0 0;
  font-weight: bold;
}

button {
  background-color: #1DB954;
  padding: 10px;
  text-transform: uppercase;
  color: white;
  min-width: 155px;
  font-size: 12px;
  border-radius: 50px;
  border: none;
}
`
