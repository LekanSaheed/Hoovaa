import toast from "react-hot-toast";

export const cartReducer = (state, action) => {
  localStorage.setItem("recent", JSON.stringify([state.recentlyViewed]));
  if (action.type === "SET_RECENT") {
    action.payload.item.link = action.payload.link;
    const id = action.payload.item.id;
    const find =
      state.recentlyViewed.length > 1 &&
      state.recentlyViewed.some((i) => i.id === id);
    console.log(find);
    console.log("reacent", JSON.parse(localStorage.getItem("recent")));
    if (find) {
      return {
        ...state,
      };
    } else {
      localStorage.setItem(
        "recent",
        JSON.stringify([...state.recentlyViewed, action.payload.item])
      );
      return {
        ...state,
        recentlyViewed: [...state.recentlyViewed, action.payload.item],
      };
    }
  }
  if (action.type === "VIEW_DEVICE") {
    action.payload.item.link = action.payload.link;
    const findItem = state.clickedDevice.some(
      (i) => i.id === action.payload.item.id
    );
    if (findItem) {
      return {
        ...state,
      };
    } else {
      localStorage.setItem(
        "selected",
        JSON.stringify([...state.clickedDevice, action.payload.item])
      );
      return {
        ...state,
        clickedDevice: [...state.clickedDevice, action.payload.item],
      };
    }
  }
  if (action.type === "SET_TOTAL_AMOUNT") {
    localStorage.setItem("totalAmount", JSON.stringify(action.payload));
    return {
      ...state,
      totalAmount: action.payload,
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      ...state,
      isModal: false,
    };
  }
  if (action.type === "ADD_TO_CART") {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    toast.success(`${action.payload.name} added to cart sucessfully`);
    const newItem = action.payload;
    const find = state.cart.find((item) => item.id === newItem.id);
    newItem.quantity = 1;
    if (find) {
      toast.success(`Product quantity increased`);

      newItem.quantity += 1;
      return {
        ...state,
        isModal: true,
        modalContent: "Product quantity increased",
      };
    } else {
      localStorage.setItem("cart", JSON.stringify([...state.cart, newItem]));

      return {
        ...state,
        cart: [...state.cart, newItem],
        isModal: true,
        modalContent: action.payload.name + " is Added to cart Sucessfully",
      };
    }
  }
  if (action.type === "REMOVE_ITEM") {
    const id = action.payload;
    const newCart = state.cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    return {
      ...state,
      cart: newCart,
      isModal: true,
      modalContent: "1 product removed successfully",
    };
  }

  if (action.type === "INCREMENT") {
    toast.success(`Product quantity increased`);
    const current = action.payload;
    const update = state.cart.map((item) =>
      item.id === current.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(update));
    return {
      ...state,
      isModal: true,
      modalContent: "Product quantity succesfully increased",
      cart: update,
    };
  }
  if (action.type === "DECREMENT") {
    const current = action.payload;
    toast.error(`Product quantity decreased`);
    const update = state.cart
      .map((item) =>
        item.id === current.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity !== 0);
    localStorage.setItem("cart", JSON.stringify(update));
    return {
      ...state,
      isModal: true,
      modalContent: "Product quantity succesfully Decreased",
      cart: update,
    };
  }
  if (action.type === "CLEAR_CART") {
    localStorage.removeItem("cart");
    return {
      ...state,
      cart: [],
      isModal: true,
      modalContent: "Cart Emptied Succesfully",
    };
  }
  return state;
};
