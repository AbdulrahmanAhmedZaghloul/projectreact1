import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import offlineimage from "../../image/download (14).svg";

import { Offline, Online } from "react-detect-offline";
// Offline
export default function Layout() {
  return (
    <React.Fragment>
      <Navbar />
      <Online>
        <div className=" mx-auto">
          <Outlet className="py-14 mx-auto">
          </Outlet>
        </div>
      </Online>
      <Offline>
        <div className="h-screen flex-col flex justify-center items-center">
          {/* <div className="py-16 w-full">           */}
            <img className=" w-1/3 py-4 mx-auto" src={offlineimage} alt="offlineimage" />
            <p className="font-bold text-xl text-red-400">not internet pelase check wife</p>

          {/* </div> */}

        </div>
      </Offline>
      <Footer />
    </React.Fragment>
  );
}
