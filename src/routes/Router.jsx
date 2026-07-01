import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import MainLayout from "../layouts/MainLayout";
import Trips from "../features/trips/Trips";
import MyJourney from "../features/myJourney/MyJourney";
import TripDetails from "../features/trips/TripDetails";
import CheckoutPage from "../features/booking/CheckoutPage";
import BookingConfirmPage from "../features/booking/BookingConfirmPage";
import ForgetPassword from "../features/auth/Forms/ForgetPassword";
import VerfiyEmail from "../features/auth/Forms/VerfiyEmail";
import CreatePassword from "../features/auth/Forms/CreatePassword";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../features/auth/Forms/Login";
import Register from "../features/auth/Forms/Register";
import AuthLayout from "../layouts/AuthLayout";

export default function Router() {
  return (
    <Routes>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-journey" element={<MyJourney />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/booking-confirm/:id" element={<BookingConfirmPage />} />
        </Route>

        <Route path="/Trips" element={<Trips />} />
        <Route path="/Trip/:id" element={<TripDetails />} />


        {/* auth route */}
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="verify-email" element={<VerfiyEmail />} />
        <Route path="create-password" element={<CreatePassword />} />
      </Route>
    </Routes>
  );
}
