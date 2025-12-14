import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerificationPage from "./pages/VerificationPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerificationPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
