import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/header";
import Wrapper from "./components/wrapper";
import Drafts from "./pages/drafts/drafts";
import Homepage from "./pages/homepage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Wrapper>
            <Routes>
              <Route path="*" element={<Homepage />} />
              <Route path="/drafts" element={<Drafts />} />
            </Routes>
          </Wrapper>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
