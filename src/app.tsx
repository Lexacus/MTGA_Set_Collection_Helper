import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/wrapper";
import Homepage from "./pages/homepage";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </div>
  );
}

export default App;
