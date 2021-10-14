import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { AiTwotoneCompass } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../reducers/context";
import "./AllCities.css";
import { db } from "./firebase";

const AllCities = () => {
  const history = useHistory();
  const { state, setCity } = GlobalContext();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

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
  });
  return (
    <ul className="allCityContainer">
      <div className="centered-text theme-text">All Cities</div>
      {React.Children.toArray(
        cities.map((item) => {
          // console.log(cities[0]);
          return item.lgas.map((city) => {
            return (
              <li
                className="cityList"
                onClick={() => {
                  setCity(city);
                  history.goBack();
                }}
              >
                <Box gridGap="5px" display="flex" alignItems="center">
                  {city}{" "}
                  {city === state.city && (
                    <AiTwotoneCompass
                      style={{ color: "#7497ff", fontSize: "9px" }}
                    />
                  )}
                </Box>
              </li>
            );
          });
        })
      )}
    </ul>
  );
};

export default AllCities;
