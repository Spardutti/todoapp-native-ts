import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { userContext } from "./Context/UserContext";
import { useState } from "react";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { tokenContext } from "./Context/tokenContex";
import { Home } from "./Components/Views/Home";
import { NavBar } from "./Components/NavBar/NavBar";
import { store } from "./store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const Nav = () =>
  useRoutes([
    { path: "/home", element: <NavBar /> },
    // {},
  ]);

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <tokenContext.Provider value={{ token, setToken }}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <ChakraProvider>
                <Nav />
                <Routes>
                  <Route path="/" element={<UserHome />} />
                  <Route path="/home" element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                  </Route>
                </Routes>
              </ChakraProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Provider>
        </tokenContext.Provider>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
