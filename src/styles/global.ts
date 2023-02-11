import { createGlobalStyle } from 'styled-components'

import { sg } from '.'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: ${sg.fontFamily.primary};
  }

  body {
    color: ${sg.colors.text};
    background: ${sg.colors.background};
    font-size: ${sg.fontSize.default};
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
    min-height: 100vh;
  }
`
