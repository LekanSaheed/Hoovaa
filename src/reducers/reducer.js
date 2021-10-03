const reducer = (state, action) => {
  if (action.type === "SET_PHONES") {
    return {
      ...state,
      allGadgets: action.payload,
    };
  }
  if (action.type === "SET_USED_GADGETS") {
    return {
      ...state,
      usedGadgets: action.payload,
    };
  }
  if (action.type === "TOGGLE_NAV") {
    return {
      ...state,
      toggle: !state.toggle,
    };
  }

  if (action.type === "CLOSE_NAV") {
    return {
      ...state,
      toggle: !state.toggle,
    };
  }
  if (action.type === "SET_SELECTED_DEVICE") {
    localStorage.setItem("userSelected", JSON.stringify(action.payload));
    return {
      ...state,
      selectedDevice: [action.payload],
    };
  }

  if (action.type === "SET_CITY") {
    localStorage.setItem("city", action.payload);

    return {
      ...state,
      isCity: false,
      isMainCity: false,
      city: action.payload,
    };
  }

  if (action.type === "CITY_STAT") {
    return {
      ...state,
      isMainCity: true,
    };
  }
  if (action.type === "SET_DEVICE_STORAGE") {
    const name = action.payload;
    const img = action.payload2;
    const price = action.payload3;
    const usedDevicePercent = (price * 20) / 100;
    const evaluated = price - usedDevicePercent;
    return {
      ...state,
      newSelected: [{ name, img, evaluated, price }],
    };
  }
  if (action.type === "SET_SEARCH_RESULT") {
    sessionStorage.setItem("result", JSON.stringify(action.payload));
    return {
      ...state,
      searchResult: [action.payload],
    };
  }
  if (action.type === "SET_USER") {
    const user = action.payload;
    return {
      ...state,
      isUser: true,
      currentUser: user,
    };
  }
  if (action.type === "LOG_OUT") {
    localStorage.clear();
    return {
      ...state,
      isUser: false,
      currentUser: {},
    };
  }
  if (action.type === "SET_STAT") {
    return {
      ...state,
      isModal: true,
      modalContent: action.payload,
    };
  }
  if (action.type === "SET_REPAIR_DATA") {
    return {
      ...state,
      repairDataAdmin: action.payload,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModal: false,
    };
  }
  if (action.type === "SET_ORDERS") {
    return {
      ...state,
      orders: action.payload,
    };
  }
};
export { reducer };
