import { SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";

// Header component using <SignedIn> & <SignedOut>.
//
// The SignedIn and SignedOut components are used to control rendering depending
// on whether or not a visitor is signed in.
//
// https://docs.clerk.dev/frontend/react/signedin-and-signedout
const Header = () => (
  <header className="header">
    <div className="left">
      <Link to="/" className="logo">
        <img src="/logo.svg" width="32" height="32" alt="Logo" />
        <span className="appName">Sherlock</span>
      </Link>
    </div>
  </header>
);

export default Header;
