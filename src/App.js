import Layout from "./components/Layout/Layout";
import PixelMap from "./components/PixelMap";

import { useSelector } from "react-redux";
import ErrorMessage from "./components/UI/ErrorMessage";
import React from "react";

function App() {
  const errorMessage = useSelector((state) => state.error.errorMessage);

  return (
    <React.Fragment>
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <Layout>
        <PixelMap />
      </Layout>
    </React.Fragment>
  );
}

export default App;
