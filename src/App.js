import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import "./App.css";
import { GlobalShop } from "./components/Pages/Buy/CartContext";
import StatusModal from "./components/StatusModal";
import { GlobalContext } from "./reducers/context";
import LogOut from "./Auth/LogOut";
import { stateChange } from "./components/firebase";

import { db } from "./components/firebase";
import SearchPage from "./components/SearchPage";
import Catalog from "./components/Catalog";
import DataCollection from "./reducers/DataCollection";
import { Box, Button } from "@material-ui/core";
import { RiSurveyLine } from "react-icons/ri";
import Error from "./components/Error";
import Cities from "./components/Cities";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";
import "./components/Pages/subPages/Devices.css";
import "./components/Pages/PhoneBrands.css";
import PrivateRoute from "./PrivateRoute";
import RegisterGadget from "./components/Pages/RegisterGadget/RegisterGadget";
import Home from "./components/Home";
import Account from "./Auth/Account";
import AllCities from "./components/AllCities";

const Admin = lazy(() => import("./Admin/Admin"));
const Login = lazy(() => import("./Auth/Login"));
const SignUp = lazy(() => import("./Auth/SignUp"));

const BuyItem = lazy(() => import("./components/Pages/BuyItem"));
const SellItem = lazy(() => import("./components/Pages/SellItem"));
const SwapItem = lazy(() => import("./components/Pages/SwapItem"));
const RepairDevice = lazy(() => import("./components/Pages/RepairDevice"));
const Cart = lazy(() => import("./components/Pages/Buy/Cart"));
const Footer = lazy(() => import("./components/Footer"));

const App = ({ hideLoader }) => {
  React.useEffect(() => {
    // localStorage.removeItem("selected");
    // localStorage.removeItem("recent");
    const unsubscribe = stateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const url = "http://locationsng-api.herokuapp.com/api/v1/lgas";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error Fetching data");
      })
      .then((data) => {
        db.collection("cities").doc("nigerian_cities").set({ data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(hideLoader, [hideLoader]);
  const newState = GlobalContext().state;

  const { state } = GlobalShop();
  return (
    <div>
      <Router forceRefresh={false}>
        <Header />
        {state.isModal && <StatusModal modalContent={state.modalContent} />}
        {newState.isModal && (
          <StatusModal modalContent={newState.modalContent} />
        )}
        <Toaster
          gutter={1}
          toastOptions={{
            style: {
              marginTop: "68px",
            },
          }}
        />
        <MobileNav />
        <Cities state={newState.isMainCity} />
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                fontSize="13px"
                padding="10px"
              >
                <span>Would you like to help take a survey?</span>{" "}
                <Link to="/survey">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    endIcon={<RiSurveyLine />}
                  >
                    Take survey{" "}
                  </Button>
                </Link>
              </Box>
              <Home />
            </Route>
            <Route path="/search" component={SearchPage} />
            <Route path="/sell-item">
              <SellItem />
            </Route>
            <Route path="/catalog/" component={Catalog} />
            <Route path="/buy-item">
              <BuyItem />
            </Route>
            <Route path="/swap-item">
              <SwapItem />
            </Route>
            <Route path="/repair-device">
              <RepairDevice />
            </Route>
            <Route path="/register-gadget">
              <RegisterGadget />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/survey" component={DataCollection} />
            <Route path="/cart" component={Cart} />
            <PrivateRoute
              path="/account"
              isUser={newState.isUser}
              component={Account}
            />
            <PrivateRoute
              path="/logout"
              isUser={newState.isUser}
              component={LogOut}
            />
            <PrivateRoute
              path="/signup"
              isUser={!newState.isUser}
              component={SignUp}
            />
            <Route path="/all-cities">
              <AllCities />
            </Route>
            <Route path="/*">
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
