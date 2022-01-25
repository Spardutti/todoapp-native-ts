import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Context/UserContext";
import { useState } from "react";
import { ProtectedRoute } from "./Components/Auth/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/todos" element={<ProtectedRoute />}>
                <Route path="/todos" element={<Todos />} />
              </Route>
            </Routes>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
