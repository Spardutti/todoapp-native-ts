import { ChakraProvider } from "@chakra-ui/react";
import { Todos } from "./Components/Todos/Todos";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">test</div>
        <Todos />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
