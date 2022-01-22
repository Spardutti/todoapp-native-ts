import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { AddTask } from "./Components/Todos/AddTask";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">test</div>
        <AddTask />
        <Todos />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
