import { Content, Header, Footer } from "./features/structure/ui/index.tsx";
import { Page } from "./shared/components/Templates.tsx";
import { Routes, Route } from "react-router";
import React, { Suspense } from "react";
import { pages } from "@/app/routes.ts";
import AuthForm from "./features/auth/AuthPage.tsx";
import { LoadingComponent, NotValidRouteComponent } from "@/shared/components";
import { Box } from "@mui/material";

const Home = React.lazy(() => import("./features/home/Home.tsx"));
function App() {
  // useEffect(() => generateMockDB(), []);
  return (
    <Box sx={{ height: "100dvh", width: "100dvw" }}>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Content />
                <Footer />
              </>
            }
          >
            <Route index element={<Home />} />

            {pages.map((item, index) => (
              <Route
                path={item.link}
                element={<Page title={item.name}>{<item.component />}</Page>}
                key={index}
              />
            ))}
            {<Route path="*" element={<NotValidRouteComponent />} />}
          </Route>

          <Route path="/auth" element={<AuthForm />}></Route>
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
