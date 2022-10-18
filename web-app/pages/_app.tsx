import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {useMediaQuery} from "@mui/material";

function MyApp({Component, pageProps}: AppProps) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      editor: {
        stroke: '#444444',
        main: "#121212",
        background: "#151515",
        toolbar: "#121212",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      editor: {
        stroke: "#484848",
        main: "#ffffff",
        background: "#f8f8f8",
        toolbar: "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
