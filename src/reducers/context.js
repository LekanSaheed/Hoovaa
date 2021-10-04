import React, { useReducer, useContext, useEffect } from "react";
import { defaultState } from "./defaultState";
import { db } from "../components/firebase";
import { reducer } from "./reducer";

const AppContext = React.createContext();

const GlobalContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const getPhones = () => {
    const data = [];
    db.collection("gadgets")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          dispatch({ type: "SET_PHONES", payload: data });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRepairData = () => {
    let repairData = [];
    const docRef = db.collection("repairs");
    docRef.orderBy("created", "desc").onSnapshot((snapshot) => {
      repairData = [];
      snapshot.forEach((doc) => {
        const {
          name,
          brand,
          model,
          damages,
          isRepaired,
          repairId,
          customerId,
          personnelReceived,
          personnelReturned,
          created,
          dateReceived,
          dateReturned,
          dateRepaired,
        } = doc.data();
        repairData.push({
          name,
          brand,
          model,
          damages,
          isRepaired,
          repairId,
          personnelReceived,
          personnelReturned,
          created,
          customerId,
          dateReceived,
          dateReturned,
          dateRepaired,
          id: doc.id,
        });
        dispatch({ type: "SET_REPAIR_DATA", payload: repairData });
      });
    });
  };

  const getUsedGadgets = () => {
    let data = [];
    db.collection("usedGadgets")
      .orderBy("created", "asc")
      .onSnapshot((querySnapshot) => {
        data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          dispatch({ type: "SET_USED_GADGETS", payload: data });
        });
      });
  };
  const getOrders = () => {
    let data = [];
    db.collection("orders").orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
        console.log(doc.data());
        dispatch({ type: "SET_ORDERS", payload: data });
      });
    });
  };
  useEffect(() => {
    getRepairData();
    getPhones();
    getUsedGadgets();
    getOrders();
  }, []);

  const [state, dispatch] = useReducer(reducer, defaultState);

  const toggleNav = () => {
    dispatch({ type: "TOGGLE_NAV" });
  };
  const closeNav = () => {
    dispatch({ type: "CLOSE_NAV" });
  };
  const getDevice = (item) => {
    dispatch({ type: "SET_SELECTED_DEVICE", payload: item });
  };
  const setDeviceStorage = (n, s, p) => {
    dispatch({
      type: "SET_DEVICE_STORAGE",
      payload: n,
      payload2: s,
      payload3: p,
    });
  };
  const setCity = (city) => {
    dispatch({ type: "SET_CITY", payload: city });
  };
  const cityStat = () => {
    dispatch({ type: "CITY_STAT" });
  };
  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };
  const logout = () => {
    dispatch({ type: "LOG_OUT" });
  };
  const setSearchResult = (item) => {
    dispatch({ type: "SET_SEARCH_RESULT", payload: item });
  };
  const setModalStat = (content) => {
    dispatch({ type: "SET_STAT", payload: content });
  };
  const close = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <AppContext.Provider
      value={{
        state,
        toggleNav,
        closeNav,
        getDevice,
        setDeviceStorage,
        setCity,
        setUser,
        logout,
        setSearchResult,
        setModalStat,
        close,
        cityStat,
        formatBytes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, GlobalContext };
