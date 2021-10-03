import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const OrderDataGrid = ({ orders }) => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      editable: true,
    },
    {
      field: "created",
      headerName: "Date Created",
      width: 150,
      editable: true,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      editable: true,
    },
    {
      field: "goods",
      headerName: "Goods",
      width: 150,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "customerId",
      headerName: "Customer ID",
      width: 150,
      editable: true,
    },
  ];
  //   const rows = [
  //     {
  //       id: "1",
  //       created: "June",
  //       customer: "shalom",
  //       goods: "banana",
  //       price: 243,
  //       quantity: 4,
  //     },
  //   ];

  let rows = [];
  for (var i = 0; i < orders.length; i++) {
    orders.forEach((item) => {
      rows.push({
        id: new Date().getTime().toString(),
        created:
          item.created.toDate().toDateString() +
          " @ " +
          item.created.toDate().toLocaleTimeString(),
        // customerId: item.uid,
        //   goods: order.map(i => i)
      });
    });
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid pageSize={5} checkboxSelection columns={columns} rows={rows} />
    </div>
  );
};

export default OrderDataGrid;
