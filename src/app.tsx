import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/wrapper";
import Homepage from "./pages/homepage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </QueryClientProvider>
    </div>
  );
}

export default App;
