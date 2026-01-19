import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.tsx";
import Modal from "./components/modals/Modal.tsx";
import MainPage from "./pages/MainPage.tsx";
import GoalPage from "./pages/GoalPage.tsx";
import ChartPage from "./pages/ChartPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
