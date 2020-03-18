import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Beta from "./Beta";
import GoogleAnalytics from "./GoogleAnalytics";
import Privacy from "./Privacy";

class App extends Component {
  render() {
    return (
      <div>
        <GoogleAnalytics />
        <AppNavbar />
        <div className="my-5"></div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/beta" component={Beta} />
          <Route exact path="/privacy" component={Privacy} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
