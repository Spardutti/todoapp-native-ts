import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { AddTask } from "./Components/Todos/AddTask";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserHome } from "./Components/User/UserHome";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<{}>();

  return (
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">test</div>
        <AddTask />
        <Todos />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
=======
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/home" element={<Todos />} />
          </Routes>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </BrowserRouter>
>>>>>>> eaa14801c81cb3567f350ee08efbbbd6930f174e
  );
}

export default App;
