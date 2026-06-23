import React, { Suspense, useMemo } from "react";
import { Routes, Route } from "react-router";
import { Box } from "@mui/material";

import { MainLayout } from "@/features/structure/ui/";
import { entityRoutes, standaloneRoutes } from "@/app/routes";
import { LoadingState, NotValidRouteComponent } from "@/shared/components";
import { Page } from "@/shared/ui/layout/Page";

const Home = React.lazy(() => import("@/features/home/Home"));
const AuthForm = React.lazy(() => import("@/features/auth/AuthPage"));

function App() {
  const entityRouteElements = useMemo(
    () =>
      entityRoutes.map((item) => {
        const PageComponent = React.lazy(item.pageComponent);
        const DetailComponent = item.detailComponent
          ? React.lazy(item.detailComponent)
          : null;

        return (
          <Route
            key={item.path}
            path={item.path}
            element={
              <Page title={item.title}>
                <PageComponent />
              </Page>
            }
          >
            {DetailComponent && (
              <>
                <Route path=":id" element={<DetailComponent />} />
                <Route path=":id/edit" element={<DetailComponent />} />
                <Route path="new" element={<DetailComponent />} />
              </>
            )}
          </Route>
        );
      }),
    [],
  );

  const standaloneRouteElements = useMemo(
    () =>
      standaloneRoutes.map((item) => {
        const PageComponent = React.lazy(item.pageComponent);
        return (
          <Route
            key={item.path}
            path={item.path}
            element={
              <Page title={item.title}>
                <PageComponent />
              </Page>
            }
          />
        );
      }),
    [],
  );

  return (
    <Box
      sx={{
        width: "100dvw",
        minHeight: "100dvh",
      }}
    >
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />

            {entityRouteElements}
            {standaloneRouteElements}

            <Route path="*" element={<NotValidRouteComponent />} />
          </Route>

          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </Suspense>
    </Box>
  );
}

export default App;
