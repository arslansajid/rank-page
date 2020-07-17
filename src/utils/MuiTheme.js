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
            dark: "#0e9bc9",
            contrastText: "#FFFFFF"
        },
    },
    props: {
        MuiInput: {
            disableUnderline: true,
            fontSize: 22
        },
        MuiButtonBase: {
            // The default props to change
            disableRipple: true // No more ripple, on the whole application 💣!
        }
    },
    overrides: {
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(255, 255, 255, .7)"
            }
        },
        MuiButton: {
            root: {
                // padding: "5px 20px",
                textTransform: "capitalize"
            }
        },
    }
});
