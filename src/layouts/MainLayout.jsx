import React from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/layout/Footer/Footer";
import PreLoader from "../components/PreLoader/PreLoader";

export default function MainLayout() {
  const location = useLocation();
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      <PreLoader isLoading={isLoading} setIsLoading={setIsLoading} />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
