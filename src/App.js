import Layout from "./components/Layout/Layout";
import PixelMapImage from "./components/PixelMapImage";

import { useSelector } from "react-redux";
import ErrorMessage from "./components/UI/ErrorMessage";
import React from "react";

function App() {
  const errorMessage = useSelector((state) => state.error.errorMessage);

  return (
    <React.Fragment>
      {errorMessage && <ErrorMessage message={errorMessage} />}

      <Layout>
        <PixelMapImage size={7} gap={1} />
      </Layout>
    </React.Fragment>
  );
}

export default App;
