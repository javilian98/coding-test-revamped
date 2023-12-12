import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
