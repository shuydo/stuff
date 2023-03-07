import { Route, Routes } from "react-router-dom";

import { ROUTES } from "../../utils/routes";

import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import SingleProduct from "../Products/SingleProduct";
import SingleCategory from "../Categories/SingleCategory";
import Cart from "../Cart/Cart";

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} /> 
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.CATEGORY} element={<SingleCategory />} /> 
    <Route path={ROUTES.CART} element={<Cart />} /> 
  </Routes>
);

export default AppRoutes;
