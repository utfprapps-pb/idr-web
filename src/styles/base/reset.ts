import { createGlobalStyle } from 'styled-components'

import { theme } from '@/styles/themes'

export const ResetStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, link, input[type="submit"] {
    cursor: pointer;
  }

  body {
		font-family: ${theme.fontFamily.primary};
		background-color: ${theme.colors.background};
  }
`
