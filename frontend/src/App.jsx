import React from "react";
import Loader from "./components/animate/Background";
import Home from "./components/home/home"
import Auth from "./components/auth/Auth"
import Role from "./components/card/uf"
import Udash from "./components/dashboard/User"
import Pdash from "./components/dashboard/performer"
import PerformerDetails from "./components/details/PerformerDetails";
import AddPerformerForm from "./components/details/PerformerDetails";
import Performerinfo from "./info/performerinfo";
import Userappointments from "./components/appointments/userappointments";
import Payment from './components/payment/payment';
import PerformerProfile from "./components/yourProfile/performerProfile";
import PerformerLayout from "./components/layout/PerformerLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loader />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/userdashboard/:id" element={<Udash />} />

        {/* Performer Routes with Persistent Layout */}
        <Route element={<PerformerLayout />}>
          <Route path="/performerdashboard/:id" element={<Pdash />} />
          <Route path="/performerprofile/:id" element={<PerformerProfile />} />
        </Route>

        <Route path='/performer/:id' element={<PerformerDetails />} />
        <Route path="/add-performer" element={<AddPerformerForm />} />
        <Route path="/performerinfo/:id" element={<Performerinfo />} />
        <Route path="/user/appointments/:id" element={<Userappointments />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


// export default App;

// import React, { useState } from "react";
// const App = () => {
//   return (
//     <>
//       <div className="main bg-black h-screen justify-center flex items-center">
//         <div className="text-bg h-4xl  flex justify-center">
//           <div className="text-performly text-white text-4xl  ">PERFORMLY</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
