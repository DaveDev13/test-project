import { createTheme } from "@mui/material/styles";
import "@fontsource/roboto";

export const defaultTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1440,
            xl: 1800,
        },
    },
});
// A custom theme for this app
const theme = createTheme({
    palette: {
        secondary: {
            main: "#19857b",
        },
    },
    typography: {
        fontFamily: "Roboto",

        h1: {
            fontWeight: "700",
            fontSize: "64px",
            lineHeight: "60px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "48px",
                lineHeight: "44px",
            },
        },
        h2: {
            fontWeight: "700",
            fontSize: "56px",
            lineHeight: "52px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "40px",
                lineHeight: "36px",
            },
        },
        h3: {
            fontWeight: "700",
            fontSize: "48px",
            lineHeight: "44px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "32px",
                lineHeight: "28px",
            },
        },
        h4: {
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "36px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "24px",
                lineHeight: "20px",
            },
        },
        h5: {
            fontWeight: "700",
            fontSize: "32px",
            lineHeight: "28px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "20px",
                lineHeight: "16px",
            },
        },
        h6: {
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "20px",
            letterSpacing: "-0.02em",
            [defaultTheme.breakpoints.down("sm")]: {
                fontSize: "18px",
                lineHeight: "14px",
            },
        },
        button: {
            padding: "12px 18px",
            fontWeight: "600" as "bold",
            fontSize: "16px",
            lineHeight: "16px",
            letterSpacing: "-0.02em",
            textTransform: "none",
        },
    },
});

export default theme;
