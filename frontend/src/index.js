import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { App } from "app";

// import ShowDoc from "components/ShowDoc.js"

ReactDOM.render(
  <>
    <Toaster />
    <App />
  </>,
  document.getElementById("root")
);
