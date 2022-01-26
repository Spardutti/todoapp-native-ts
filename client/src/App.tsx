import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Context/UserContext";
import { useState } from "react";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";
import { tokenContext } from "./Context/tokenContex";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <tokenContext.Provider value={{ token, setToken }}>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider>
              <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/todos" element={<ProtectedRoute />}>
                  <Route path="/todos" element={<Todos />} />
                </Route>
              </Routes>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </tokenContext.Provider>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
