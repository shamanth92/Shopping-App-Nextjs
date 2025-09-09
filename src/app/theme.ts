'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#21b6ae',
    },
    secondary: {
      main: '#000000',
      contrastText: '#000000'
    },
    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          borderColor: '#21b6ae'
        }
      }
    }
  }
});

export default theme;
