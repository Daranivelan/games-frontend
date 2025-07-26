import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Favourite from "./pages/Favourite";
import { GameProvider } from "./context/gameContext";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <GameProvider>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourites" element={<Favourite />} />
          </Routes>
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
