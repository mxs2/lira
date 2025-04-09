import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

// Wrap Header and Footer in React.memo if they are static components
const MemoizedHeader = React.memo(Header);
const MemoizedFooter = React.memo(Footer);

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <MemoizedHeader />
      <main className="flex-grow relative z-10">{children}</main>
      <MemoizedFooter />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Layout);
