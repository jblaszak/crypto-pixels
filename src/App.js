import React from "react";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import PixelMap from "./components/PixelMap";
import ErrorMessage from "./components/UI/ErrorMessage";

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
