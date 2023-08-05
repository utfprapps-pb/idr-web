import { createGlobalStyle } from 'styled-components'

import { theme } from '@/styles/themes'

export const ResetStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		font-family: ${theme.fontFamily.primary};
  }

  button, link, input[type="submit"] {
    cursor: pointer;
  }

  body {
		color: ${theme.colors.text};
		background-color: ${theme.colors.background};
		line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

	html, body, #root {
    height: 100%;
    min-height: 100vh;
		min-height: 100dvh;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

	*::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${theme.colors.white};
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.gray};
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
`
