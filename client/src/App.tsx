import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userContext } from "./Context/UserContext";
import { useContext, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/home" element={<Todos />} />
            </Routes>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
