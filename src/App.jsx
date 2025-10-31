import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AddProduct from "./pages/AddProduct";
import AuthLaout from "./layout/AuthLaout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLaout>
              <Login />
            </AuthLaout>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLaout>
              <SignUp />
            </AuthLaout>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/addProduct" element={<AddProduct />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
