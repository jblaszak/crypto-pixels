import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import ErrorMessage from "./components/UI/ErrorMessage";

const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Home = React.lazy(() => import("./Pages/Home"));
const CollectionViewer = React.lazy(() => import("./Pages/CollectionViewer"));

function App() {
  const errorMessage = useSelector((state) => state.error.errorMessage);

  return (
    <React.Fragment>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/collection-viewer" exact>
              <CollectionViewer />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </React.Fragment>
  );
}

export default App;
