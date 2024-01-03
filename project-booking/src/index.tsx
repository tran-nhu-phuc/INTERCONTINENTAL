import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PayPalScriptProvider
          options={{
            clientId:
              "AY3EKQQvXO2r3iDT8umbsTDPUI1RrqpYP6B8pXSSVde9Ia2GbBE_AKjJXjaMStWJJxpnJfnFE3vod__k",
          }}
        >
          <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
