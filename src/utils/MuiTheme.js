import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200
        }
    },
    palette: {
        primary: {
            main: "#19A5D3",
            light: "#0778b9",
            dark: "#072f5e",
            contrastText: "#FFFFFF"
        },
    },
});
