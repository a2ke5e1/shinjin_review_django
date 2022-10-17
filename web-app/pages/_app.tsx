import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
