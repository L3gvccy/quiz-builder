import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout/layout";
import MainPage from "./pages/main/main-page";
import Quizzes from "./pages/quiz/quizzes";
import CreateQuizPage from "./pages/create-quiz/create-quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="create" element={<CreateQuizPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
