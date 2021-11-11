import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import StatusMessage from "./components/UI/StatusMessage";
import TermsPopup from "./components/UI/TermsPopup";

const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Home = React.lazy(() => import("./Pages/Home"));
const CollectionViewer = React.lazy(() => import("./Pages/CollectionViewer"));
const Terms = React.lazy(() => import("./Pages/Terms"));
// const SecretMinting = React.lazy(() => import("./Pages/SecretMinting"));

function App() {
  const { statusMessage, statusType, isPrivacyChecked } = useSelector(
    (state) => state.status
  );

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
            <Route path="/terms" exact>
              <Terms />
            </Route>
            {/* <Route path="/secret-minting" exact>
              <SecretMinting />
            </Route> */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
      {!isPrivacyChecked && <TermsPopup />}
    </React.Fragment>
  );
}

export default App;
