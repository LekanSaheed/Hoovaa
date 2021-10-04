import { Dialog } from "@material-ui/core";
import {
  Box,
  Paper,
  Modal,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouteMatch, useHistory } from "react-router-dom";

import "./SwapGadget.css";
const SwapGadget = () => {
  const [caption, setCaption] = useState(true);
  const [modal, setModal] = useState(false);
  const { url } = useRouteMatch();
  const swapLinks = [
    {
      text: "Phone",
      icon: "",
    },
    {
      text: "Laptop",
      icon: "",
    },
    {
      text: "Tablet",
      icon: "",
    },
    {
      text: "Gaming Consoles",
      icon: "",
    },
    {
      text: "Home Appliances",
      icon: "",
    },
    {
      text: "TVs",
      icon: "",
    },
  ];
  const history = useHistory();

  const useStyle = makeStyles((theme) => ({
    root: {},
    gridItem: {
      boxShadow: "0px 0px 10px -10px green",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "skyblue",
      margin: "10px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: '10px',
      [theme.breakpoints.up("767")]: {
        height: "150px",
      },
      height: "80px",
    },
  }));
  const classes = useStyle();
  return (
    <div>
      {sessionStorage.getItem("caption")
        ? null
        : caption && (
            <Box
              display="flex"
              style={{
                background: "#EDF1FA",
                border: "solid 2px #bebebe",
                fontSize: "14px",
              }}
              justifyContent="space-between"
              gridGap="20px"
              padding="10px"
            >
              <div>
                Humpty, Dumpty, Good luck brought you here, tired of your
                gadget? Give it a swap.
              </div>

              <span
                onClick={() => {
                  setCaption(false);
                  sessionStorage.setItem("caption", false);
                }}
              >
                <AiOutlineClose />
              </span>
            </Box>
          )}
      {modal && (
        <Modal
          open={modal}
          children={
            <Dialog
              open={modal}
              children={
                <DialogContent
                  children={
                    <DialogActions>
                      <Box display="flex" flexDirection="column">
                        <div>
                          Select your device and its conditions if any, then
                          choose the device you wanna swap with, so easy
                        </div>
                        <Button onClick={() => setModal(false)}>Got it</Button>
                      </Box>
                    </DialogActions>
                  }
                />
              }
            />
          }
        />
      )}
      <div className="centered-text">What would you like to swap?</div>
      <Paper>
        <div className="blob" onClick={() => setModal(true)}>
          Swap
        </div>
        <div className="swap-grid">
          {React.Children.toArray(
            swapLinks.map((children) => {
              return (
                <div
                  className={classes.gridItem}
                  onClick={() => {
                    history.push(url + "/" + children.text.toLowerCase());
                    sessionStorage.setItem(
                      "swaplink",
                      url + "/" + children.text.toLowerCase()
                    );
                    localStorage.setItem("swap-item", JSON.stringify(children));
                  }}
                >
                  <span>{children.text}</span>
                  <span>icon</span>
                </div>
              );
            })
          )}
        </div>
      </Paper>
    </div>
  );
};

export default SwapGadget;
