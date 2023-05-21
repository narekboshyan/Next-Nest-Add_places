import React, { useState } from "react";
import Link from "next/link";

import NavLinks from "./NavLinks";
import SideDrawer from "@/components/molecules/SideDrawer";
import Backdrop from "@/components/atoms/Backdrop";
import "./MainNavigation.css";

const MainNavigation: React.FC = (props) => {
 const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

 const openDrawerHandler = () => {
  setDrawerIsOpen(true);
 };

 const closeDrawerHandler = () => {
  setDrawerIsOpen(false);
 };

 return (
  <>
   {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
   <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
    <nav className="main-navigation__drawer-nav">
     <NavLinks />
    </nav>
   </SideDrawer>

   <header className="main-header">
    <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
     <span />
     <span />
     <span />
    </button>
    <h1 className="main-navigation__title">
     <Link href="/">YourPlaces</Link>
    </h1>
    <nav className="main-navigation__header-nav">
     <NavLinks />
    </nav>
   </header>
  </>
 );
};

export default MainNavigation;
