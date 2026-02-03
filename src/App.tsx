import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Modal from './components/modals/Modal.tsx';
import HabitPage from './pages/HabitPage.tsx';
import GoalPage from './pages/GoalPage.tsx';
import MainPage from './pages/MainPage.tsx';
import CoursePage from './pages/CoursePage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/goal" element={<GoalPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/kmooc" element={<CoursePage />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;
