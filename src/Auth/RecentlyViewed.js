import { Box, CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { GlobalShop } from "../components/Pages/Buy/CartContext";

const RecentlyViewed = () => {
  const useStyle = makeStyles((theme) => ({
    root: {},
    grids: {
      overflow: "scroll",
    },
  }));
  const classes = useStyle();
  const { state } = GlobalShop();
  const recent = state.recentlyViewed;
  recent.length = 4;
  // const recent = state.recentlyViewed.length > 4 ? state.recentlyViewed.reverse().slice(-5) : state.recentlyViewed
  return (
    <div>
      <h5>Recently Viewed</h5>
      <Box className={classes.grids} display="flex">
        {" "}
        {state.recentlyViewed.length === 0
          ? "Recently viewed Items will appear here"
          : recent.map((item, idx) => {
              return (
                <Link to={item.link} key={idx}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    margin="10px"
                    alignItems="center"
                  >
                    <CardMedia
                      children={
                        <img
                          style={{ width: "120px" }}
                          alt="product"
                          src={item.img}
                        />
                      }
                    />
                    <div>{item.name}</div>
                    <div>{item.price}</div>
                  </Box>
                </Link>
              );
            })}
      </Box>
    </div>
  );
};

export default RecentlyViewed;
