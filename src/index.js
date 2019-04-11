import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";

const Box = () => {
  return (
    <div className="box">
      <App />
    </div>
  );
};
ReactDOM.render(<Box />, document.getElementById("root"));
