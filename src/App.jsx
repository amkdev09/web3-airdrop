import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "./features/snackBar";
import AppRouter from "./router";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/global.scss";
import Web3ModalWagmiProvider from "./wallet/Web3ModalWagmiProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/*
        QueryClient must wrap Wagmi: hooks like useReconnect use TanStack Query under the hood.
      */}
      <Web3ModalWagmiProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </BrowserRouter>
      </Web3ModalWagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
