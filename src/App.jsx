import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { SnackbarProvider } from "./features/snackBar";
import AppRouter from "./router";
import ScrollToTop from "./components/ScrollToTop";
import { store } from "./store/store";
import "./styles/global.scss";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <SnackbarProvider>
          <AppRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
