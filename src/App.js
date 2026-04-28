import "./App.css";
import { Content, Header, Footer } from "./components";
import { Page } from "./components/Templates";
import { Routes, Route } from "react-router";
import React, { Suspense } from "react";
import { pages } from "./entities";
import AuthForm from "./components/pages/Auth";
import { Typography } from "@mui/material";
import {
  LoadingPage,
  NotValidRoutePage,
} from "./components/pages/InformationPages";

const Home = React.lazy(() => import("./components/pages/Home"));

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<Content />}>
            <Route index element={<Home />} />

            {pages.map((item, index) => (
              <Route
                path={item.link}
                element={<Page title={item.name}>{item.component}</Page>}
                key={index}
              />
            ))}
            {<Route path="*" element={<NotValidRoutePage />} />}
          </Route>

          <Route path="/auth" element={<AuthForm />}></Route>
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
