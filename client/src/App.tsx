import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { Home } from "./Components/Views/Home";
import { NavBar } from "./Components/NavBar/NavBar";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Upcoming from "./Components/Views/Upcoming";

const queryClient = new QueryClient();

const Nav = () =>
  useRoutes([
    { path: "/home", element: <NavBar /> },
    { path: "/upcoming", element: <NavBar /> },
    // {},
  ]);

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Toaster />
            <Nav />
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/home" element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
              </Route>
              <Route path="/upcoming" element={<ProtectedRoute />}>
                <Route path="/upcoming" element={<Upcoming />} />
              </Route>
            </Routes>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
