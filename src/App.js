import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import StatusMessage from "./components/UI/StatusMessage";

const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Home = React.lazy(() => import("./Pages/Home"));
const CollectionViewer = React.lazy(() => import("./Pages/CollectionViewer"));

function App() {
  const { statusMessage, statusType } = useSelector((state) => state.status);

  return (
    <React.Fragment>
      {statusMessage && (
        <StatusMessage message={statusMessage} type={statusType} />
      )}
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
