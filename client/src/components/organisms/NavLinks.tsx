import React, { useContext } from "react";
import Link from "next/link";

import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
 const auth = useContext(AuthContext);

 return (
  <ul className="nav-links">
   <li>
    <Link href="/" passHref>
     ALL USERS
    </Link>
   </li>
   {auth.isLoggedIn && (
    <li>
     <Link href={`/${auth.userId}/places`} passHref>
      MY PLACES
     </Link>
    </li>
   )}
   {auth.isLoggedIn && (
    <li>
     <Link href="/places/new" passHref>
      ADD PLACE
     </Link>
    </li>
   )}
   {!auth.isLoggedIn && (
    <li>
     <Link href="/auth" passHref>
      AUTHENTICATE
     </Link>
    </li>
   )}
   {auth.isLoggedIn && (
    <li>
     <button onClick={auth.logout}>LOGOUT</button>
    </li>
   )}
  </ul>
 );
};

export default NavLinks;
