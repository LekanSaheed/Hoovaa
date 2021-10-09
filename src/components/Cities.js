import React from "react";
import "./Cities.css";
import { GlobalContext } from "../reducers/context";
import Skeleton from "react-loading-skeleton";
import { Modal, Dialog, DialogTitle, Box, Button } from "@material-ui/core";
import { db } from "./firebase";
import { AiTwotoneCompass } from "react-icons/ai";
import { Switch, Link } from "react-router-dom";

const Cities = ({ state }) => {
  const { setCity, closeCity } = GlobalContext();
  const newState = GlobalContext().state;
  const [cities, setCities] = React.useState([
    { lgas: ["ghana", "jamaica", "Araromi", "Agege"] },
  ]);
  const [loading, setLoading] = React.useState(!true);

  React.useEffect(() => {
    const loader = document.querySelector(".loader-container");
    loading && loader.classList.remove("loader-hide");
    db.collection("cities")
      .doc("nigerian_cities")
      .get()
      .then((doc) => {
        const myCities = [];
        myCities.push(doc.data());
        const newCity = myCities[0].data.filter(
          (item) => item.state === "Lagos"
        ); //.filter((city) => city.state === 'Lagos')
        setCities(newCity);
      })
      .then(() => {
        setLoading(false);
        loader.classList.add("loader-hide");
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [setCities, setLoading, loading]);

  const cityComp = cities.map((item) => {
    const size = 12;
    const totalToShow = item.lgas.slice(0, size);
    return (
      <>
        <div className="city-grid">
          {totalToShow.map((n, idx) => {
            return (
              <div key={idx} className="cities" onClick={() => setCity(n)}>
                <Box gridGap="5px" display="flex" alignItems="center">
                  {n}{" "}
                  {n === newState.city && (
                    <AiTwotoneCompass
                      style={{ color: "#7497ff", fontSize: "9px" }}
                    />
                  )}
                </Box>
              </div>
            );
          })}
        </div>
        <div className="searchView">
          <input type="search" placeholder="Search City" />
          <Link
            onClick={() => closeCity()}
            to="/all-cities"
            style={{ color: "black" }}
          >
            View All cities
          </Link>
        </div>
      </>
    );
  });

  return (
    <Switch>
      <Modal
        children={
          <Dialog
            children={
              <div>
                <DialogTitle
                  children={
                    <Box
                      fontSize="12px"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      CHOOSE A CITY TO CONTINUE{" "}
                      {newState.city ? (
                        <Button
                          onClick={() => closeCity()}
                          variant="contained"
                          size="small"
                          color="secondary"
                        >
                          Close
                        </Button>
                      ) : (
                        ""
                      )}
                    </Box>
                  }
                />
                {loading ? (
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      count={12}
                      className="city-grid"
                      width={100}
                      height={40}
                      style={{ margin: "10px" }}
                    />
                  </div>
                ) : (
                  cityComp
                )}
              </div>
            }
            fullWidth={true}
            maxWidth="lg"
            open={state}
          />
        }
        open={state}
      />
    </Switch>
  );
};

export default Cities;
