import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import StatusMessage from "./components/UI/StatusMessage";
import TermsPopup from "./components/UI/TermsPopup";

const NotFound = React.lazy(() => import("./Pages/NotFound"));
const Home = React.lazy(() => import("./Pages/Home"));
const Terms = React.lazy(() => import("./Pages/Terms"));

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
            <Route path="/terms" exact>
              <Terms />
            </Route>
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
