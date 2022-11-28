import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#023020' },
    secondary: { main: '#b62324' },
    mode: 'light',
    background: { default: '#fff' },
    text: {
      primary: '#023020',
    },
  },
});

export { theme };
