import { Paper } from "@material-ui/core";
import React from "react";
import { GlobalContext } from "../../reducers/context";
import OrderDataGrid from "./OrderDataGrid";

const Order = () => {
  const { state } = GlobalContext();

  React.useEffect(() => {
    console.log(state.orders);
  });
  return (
    <Paper>
      <OrderDataGrid orders={state.orders} />
      {/* {React.Children.toArray(
        state.orders.map((order) => {
          return (
            <Box display="flex" flexDirection="column">
              <div>User ID {order.uid}</div>
              <div>
                Order placed on {order.created.toDate().toDateString()} @{" "}
                {order.created.toDate().toLocaleTimeString()}
                <OrderDataGrid />
              </div>
            </Box>
          );
        })
      )} */}
    </Paper>
  );
};

// const NewE = () => {
//     return(
//         <div>
//             .orders.map((order) => {
//               const item = order;
//               return (
//                 <Box>
//                   Order
//                   {item.name}
//                 </Box>
//               );
//             });
//         </div>
//     )
// }
export default Order;
