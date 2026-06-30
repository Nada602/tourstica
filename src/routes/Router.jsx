import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import MainLayout from "../layouts/MainLayout";
import Trips from "../features/trips/Trips";
import MyJourney from "../features/myJourney/MyJourney";
import TripDetails from "../features/trips/TripDetails";
import CheckoutPage from "../features/booking/CheckoutPage";
import BookingConfirmPage from "../features/booking/BookingConfirmPage";
import ForgetPassword from "../features/auth/screens/ForgetPassword";
import VerfiyEmail from "../features/auth/screens/VerfiyEmail";
import CreatePassword from "../features/auth/screens/CreatePassword";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../features/auth/screens/Login";
import Register from "../features/auth/screens/Register";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/my-journey" element={<MyJourney />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/booking-confirm" element={<BookingConfirmPage />} />
      </Route>

      <Route path="/Trips" element={<Trips />} />
      <Route path="/Trip/:id" element={<TripDetails />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/verify-email" element={<VerfiyEmail />} />
      <Route path="/create-password" element={<CreatePassword />} />

      
    </Routes>
  );
}
