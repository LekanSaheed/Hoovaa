import {
  Box,
  Button,
  makeStyles,
  Modal,
  DialogContent,
  Dialog,
  Badge,
} from "@material-ui/core";
import React, { useState } from "react";
import { db, firebase } from "../components/firebase";
import { GlobalContext } from "../reducers/context";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import RepairedGadgets from "./RepairedGadgets";

const Repairs = () => {
  const { state } = GlobalContext();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const useStyle = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    gadgets: {
      boxShadow: "0 0 10px 0 rgba(0 0 0 /14%)",
      padding: "15px",
      margin: "15px",
    },
    tag: {
      background: "rgb(19, 26, 41)",
      color: "white",
    },
    status: {
      color: "green",
      fontWeight: "600",
    },
    statusBad: {
      color: "#c41e3a",
      fontWeight: "600",
    },
    link: {
      padding: "10px",
      color: "black",
      fontWeight: "600",
      fontSize: "18px",
    },
  }));
  const classes = useStyle();

  const { setModalStat } = GlobalContext();

  const updateRepairDoc = (item) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.remove("loader-hide");
    const docRef = db.collection("repairs").doc(item.id);
    const custRef = db
      .collection("users")
      .doc(item.customerId)
      .collection("repairHistory")
      .doc(item.repairId);
    console.log(item);
    custRef
      .update({
        isRepaired: true,
        dateRepaired: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        docRef.update({
          isRepaired: true,
          dateRepaired: firebase.firestore.Timestamp.now(),
        });
      })
      .then(() => {
        setModal(false);
        loader.classList.add("loader-hide");
      })
      .then(() => {
        setModalStat("Updated Successfully");
      })
      // .then(()=> {
      //     window.location.reload()
      // })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setModalStat("Something Went wrong");
        loader.classList.add("loader-hide");
      });
    return;
  };
  const updateCustomerCollectedStatus = (item) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.remove("loader-hide");
    const docRef = db.collection("repairs").doc(item.id);
    const custRef = db
      .collection("users")
      .doc(item.customerId)
      .collection("repairHistory")
      .doc(item.repairId);
    console.log(item);
    custRef
      .update({
        personnelReturned: true,
        dateReturned: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        docRef.update({
          personnelReturned: true,
          dateReturned: firebase.firestore.Timestamp.now(),
        });
      })
      .then(() => {
        setModal(false);
        loader.classList.add("loader-hide");
      })
      .then(() => {
        setModalStat("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setModalStat("Something Went wrong");
        loader.classList.add("loader-hide");
      });
  };

  const updatePersonnelReceivedStatus = (item) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.remove("loader-hide");
    const docRef = db.collection("repairs").doc(item.id);
    const custRef = db
      .collection("users")
      .doc(item.customerId)
      .collection("repairHistory")
      .doc(item.repairId);
    console.log(item);
    custRef
      .update({
        personnelReceived: true,
        dateReceived: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        docRef.update({
          personnelReceived: true,
          dateReceived: firebase.firestore.Timestamp.now(),
        });
      })
      .then(() => {
        setModal(false);
        loader.classList.add("loader-hide");
      })
      .then(() => {
        setModalStat("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
        setModalStat("Something Went wrong");
        loader.classList.add("loader-hide");
      });
  };
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Box className={classes.root}>
          New Repair Orders will appear here
          {error && error}
          <Box>
            <Link to={url + "/new-repair-orders"}>
              <Box
                className={classes.link}
                display="flex"
                justifyContent="space-between"
              >
                <span>
                  <Badge
                    badgeContent={0}
                    color="secondary"
                    children="New Repair Orders"
                    showZero={true}
                  />
                </span>
                <span>
                  <MdKeyboardArrowRight />
                </span>
              </Box>
            </Link>

            <Link to={url + "/repaired-gadgets"}>
              <Box
                className={classes.link}
                display="flex"
                justifyContent="space-between"
              >
                <span>
                  <Badge
                    badgeContent={0}
                    color="secondary"
                    children="Repaired Gadgets"
                    showZero={true}
                  />
                </span>
                <span>
                  <MdKeyboardArrowRight />
                </span>
              </Box>
            </Link>
          </Box>
        </Box>
      </Route>
      <Route path={path + "/repaired-gadgets"}>
        <RepairedGadgets repairData={state.repairDataAdmin} />
      </Route>
      <Route path={path + "/new-repair-orders"}>
        {React.Children.toArray(
          state.repairDataAdmin
            .filter((i) => i.isRepaired === false)
            .map((repair) => {
              return (
                <Box
                  className={classes.gadgets}
                  display="flex"
                  flexDirection="column"
                >
                  <div>Date: {repair.created.toDate().toDateString()}</div>
                  <div>Gadget Name: {repair.name}</div>
                  <div>Gadget Brand: {repair.brand}</div>
                  <div>Gadget Model: {repair.model}</div>
                  <div>
                    Gadget Damages
                    {React.Children.toArray(
                      repair.damages &&
                        repair.damages.map((damages) => {
                          return <div>{damages.value}</div>;
                        })
                    )}
                  </div>
                  <div>
                    Repair Status:{" "}
                    {repair.isRepaired ? (
                      <Box
                        className={classes.status}
                        display="flex"
                        alignItems="center"
                      >
                        <span>Repaired</span>
                        <AiOutlineCheck />
                      </Box>
                    ) : (
                      <Box
                        className={classes.statusBad}
                        alignItems="center"
                        display="flex"
                      >
                        <AiOutlineCloseCircle />
                        <span>Not Repaired</span>
                      </Box>
                    )}
                  </div>

                  <Box>
                    {repair.personnelReceived && (
                      <Button onClick={() => updateRepairDoc(repair)}>
                        Change Status to repaired
                      </Button>
                    )}
                    {repair.isRepaired && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updateCustomerCollectedStatus(repair)}
                      >
                        Set Return Status
                      </Button>
                    )}
                    {!repair.personnelReceived && (
                      <Box>
                        <Button
                          variant="contained"
                          onClick={() => updatePersonnelReceivedStatus(repair)}
                        >
                          Received from customer
                        </Button>
                      </Box>
                    )}
                  </Box>
                  {modal && (
                    <Modal
                      open={modal}
                      children={
                        <Dialog
                          open={modal}
                          children={
                            <DialogContent>
                              Clicking Update Status Means the gadget is
                              repaired and is due for collection
                              <br />
                              <Box>
                                <Button onClick={() => updateRepairDoc(repair)}>
                                  Update Status
                                </Button>
                                <Button onClick={() => setModal(false)}>
                                  Cancel
                                </Button>
                              </Box>
                            </DialogContent>
                          }
                        />
                      }
                    />
                  )}
                </Box>
              );
            })
        )}
      </Route>
    </Switch>
  );
};

export default Repairs;
