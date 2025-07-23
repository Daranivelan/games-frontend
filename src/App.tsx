import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
