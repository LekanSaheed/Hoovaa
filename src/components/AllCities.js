import { Box } from "@material-ui/core";
import React from "react";
import { AiTwotoneCompass } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../reducers/context";
import "./AllCities.css";

const AllCities = () => {
  const history = useHistory();
  const { state, setCity } = GlobalContext();
  return (
    <ul className="allCityContainer">
      <div className="centered-text theme-text">All Cities</div>
      {React.Children.toArray(
        state.allCities.map((city) => {
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
        })
      )}
    </ul>
  );
};

export default AllCities;
