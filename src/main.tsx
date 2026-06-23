import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./app/theme";
import { CssBaseline } from "@mui/material";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  // </StrictMode>,
);
