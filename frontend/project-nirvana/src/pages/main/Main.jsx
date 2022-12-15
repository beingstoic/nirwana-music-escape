import React from "react";
import ResponsiveDrawer from "../../components/sidebar/sidebar";

import "./main.css";
import Header from "../../components/Header/Header";
import { Routes, Router, Route, Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import SignInAndSignUpPage from "../sign-in-and-sign-up/sign-in-and-sign-up.component";

const drawerWidth = 250;
const Main = (props) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", overflowY: "hidden" }}
    >
      <div style={{ display: "flex", overflowY: "scroll" }}>
        <ResponsiveDrawer style={{ backgroundColor: "#040404" }} />

        <div className="body-container">
          <Header />
          <Routes>
            <Route path="/signin" element={<SignInAndSignUpPage />}></Route>
          </Routes>
        </div>
      </div>
      {/* <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/about' element={< About />}></Route>
        <Route exact path='/contact' element={< Contact />}></Route> */}
      <Footer />
    </div>
  );
};

export default Main;
