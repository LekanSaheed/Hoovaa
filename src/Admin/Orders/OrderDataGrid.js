import React, {useState} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { db } from "../../components/firebase";

const OrderDataGrid = ({ orders }) => {
  const [rows, setRows] = useState([])
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: true,
    },
    {
      field: "created",
      headerName: "Date Created",
      width: 100,
      editable: true,
    },
    {
      field: "time",
      headerName: "Time",
      width: 100,
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
      width: 100,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 50,
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


  React.useEffect(() => {
   let dataRows = [];

    orders.forEach((item) => {
      
      
      dataRows.push({
        id: item.created,
        created:
          item.created.toDate().toDateString(),
          time:  item.created.toDate().toLocaleTimeString(),
         customerId: item.uid,
        //   goods: order.map(i => i)
        customer:  JSON.stringify(db.collection('users').doc(item.uid).get().then(user => user.data().firstName))
      });
    });
    setRows(dataRows)
   
  }, [orders])
 
  
  

  return (
    <div style={{ height: "500px", width: 'auto' }}>
      <DataGrid pageSize={5} checkboxSelection columns={columns} rows={rows} />
    </div>
  );
};

export default OrderDataGrid;
