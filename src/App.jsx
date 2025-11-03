import { Route, Routes } from "react-router";
import AddProduct from "./pages/AddProduct";
import AuthLaout from "./layout/AuthLaout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import NotFoundPage from "./pages/NotFoundPage";
import Dashboard from "./pages/Dashboard";
import ProductsView from "./pages/ProductsView";
import Inventory from "./pages/Inventory";
import User from "./pages/User";
import Entries from "./pages/Entries";
import Exits from "./pages/Exits";
import MainLayout from "./layout/MainLayout";
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

        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsView />
            </MainLayout>
          }
        />
        <Route
          path="/inventory"
          element={
            <MainLayout>
              <Inventory />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <User />
            </MainLayout>
          }
        />
        <Route
          path="/entries"
          element={
            <MainLayout>
              <Entries />
            </MainLayout>
          }
        />
        <Route
          path="/exits"
          element={
            <MainLayout>
              <Exits />
            </MainLayout>
          }
        />

        <Route path="/addProduct" element={<AddProduct />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
