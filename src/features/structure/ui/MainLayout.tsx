import React, { useState } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export const MainLayout = React.memo(() => {
  const [isOpenLeftMenu, setOpenLeftMenu] = useState(true);
  const handleToggleLeftMenu = () => setOpenLeftMenu((prev) => !prev);

  return (
    <>
      <Header handleToggleLeftMenu={handleToggleLeftMenu} />
      <Content isOpenLeftMenu={isOpenLeftMenu} />
      <Footer />
    </>
  );
});
