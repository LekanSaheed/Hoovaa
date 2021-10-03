import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./Admin.css";
import { makeStyles } from "@material-ui/core";
import { firebaseStorage, firebase } from "../components/firebase";
import Select from "react-select";
import { brandOptions, categoryOptions, storageOptions } from "./options";
// import { GlobalContext } from "../reducers/context";
import toast from "react-hot-toast";

const AdminUpload = ({ colRef, tag, type }) => {
  const [img, setImg] = useState(null);
  //   const [img2, setImg2] = useState(null);
  //   const [img3, setImg3] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [storage, setStorage] = useState(null);
  const [worth, setWorth] = useState(null);
  const [error, setError] = useState("");
  //   const [error2, setError2] = useState("");
  //   const [error3, setError3] = useState("");
  const [description, setDescription] = useState("");

  const handleBrand = (brand) => {
    setBrand(brand);
  };
  const handleCategory = (category) => {
    setCategory(category);
  };
  const handleStorage = (storage) => {
    setStorage(storage);
  };
  const useStyles = makeStyles((theme) => ({
    tag: {
      background: "grey",
      color: "white",
      textTransform: "uppercase",
    },
    root: {
      [theme.breakpoints.up("800")]: {
        width: "100%",
      },
    },
  }));
  const classes = useStyles();
  const types = ["image/jpg", "image/png", "image/jpeg"];

  const handleImg = (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImg(selected);
      setError("");
    } else if (!selected) {
      setError("No file selected");
    } else {
      setError("Invalid file type");
      setImg(null);
    }
  };

  //   const handleImg2 = (e) => {
  //     const selected = e.target.files[0];
  //     if (selected && types.includes(selected.type)) {
  //       setImg2(selected);
  //       setError2("");
  //     } else if (!selected) {
  //       setError2("No file selected");
  //     } else {
  //       setError2("Invalid file type");
  //       setImg2(null);
  //     }
  //   };

  //   const handleImg3 = (e) => {
  //     const selected = e.target.files[0];
  //     if (selected && types.includes(selected.type)) {
  //       setImg3(selected);
  //       setError3("");
  //     } else if (!selected) {
  //       setError3("No file selected");
  //     } else {
  //       setError3("Invalid file type");
  //       setImg3(null);
  //     }
  //   };

  //   const { setModalStat } = GlobalContext();

  const handleSubmit = (e) => {
    const loader = document.querySelector(".loader-container");
    loader.classList.remove("loader-hide");
    e.preventDefault();
    // const colRef = db.collection('usedPhones')
    const ref = firebaseStorage.ref(`/images/${img.name}`);
    const uploadTask = ref.put(img);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((iurl) => {
        //file upload
        colRef
          .add({
            id: new Date().getTime().toString(),
            name,
            brand,
            category,
            desc: type === "products" && description,
            price: parseInt(worth),
            storage,
            img: iurl,
            created: firebase.firestore.Timestamp.now(),
          })
          .then(() => {
            loader.classList.add("loader-hide");

            toast.success("Document successfully written!");
          })
          .catch((err) => {
            loader.classList.add("loader-hide");
            toast.error("Error Writing Document", err);
          });
      });
    });
  };

  return (
    <div className={classes.root}>
      <Box
        className={classes.tag}
        padding="10px"
        children={<span>{tag}</span>}
      />
      <form className="form-control">
        <div className="input-container centered-text" style={{ color: "red" }}>
          {" "}
          {error && error} <br />
          {/* {error2 && error2} */}
          <br />
          {/* {error3 && error3} */}
        </div>
        <div className="input-container">
          <label>Device Image</label>

          <TextField
            hidden
            error={error}
            fullWidth={true}
            type="file"
            variant="outlined"
            onChange={handleImg}
          />
        </div>
        {/* {type === "products" && (
          <>
            <div className="input-container">
              <label>Second Image</label>
              <TextField
                error={error2}
                fullWidth={true}
                type="file"
                variant="outlined"
                onChange={handleImg2}
              />
            </div>
            <div className="input-container">
              <label>Third Image</label>
              <TextField
                error={error3}
                fullWidth={true}
                type="file"
                variant="outlined"
                onChange={handleImg3}
              />
            </div>
          </>
        )} */}
        <div className="input-container">
          <TextField
            label="Device Name"
            fullWidth={true}
            type="text"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            required
          />
        </div>
        <div className="input-container">
          <TextField
            type="number"
            variant="outlined"
            value={worth}
            onChange={(e) => setWorth(e.target.value.toLowerCase())}
            required
            label="Device price"
            fullWidth={true}
          />
        </div>
        <div className="input-container">
          <Select
            isSearchable={true}
            value={brand}
            onChange={handleBrand}
            options={brandOptions}
            placeholder="select brand"
            theme={(theme) => ({
              ...theme,
              borderRadius: "50",
              fontSize: "10px",
              padding: "20px",
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
          />
        </div>

        <div className="input-container">
          <Select
            isSearchable={true}
            value={category}
            onChange={handleCategory}
            options={categoryOptions}
            placeholder="Select Category"
            theme={(theme) => ({
              ...theme,
              borderRadius: "50",
              fontSize: "10px",
              padding: "20px",
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
          />
        </div>

        <div className="input-container">
          <Select
            isMulti={type === "usedGadgets" && true}
            isSearchable={true}
            value={storage}
            onChange={handleStorage}
            options={storageOptions}
            placeholder="Select Storage"
            theme={(theme) => ({
              ...theme,
              borderRadius: "50",
              fontSize: "10px",
              padding: "20px",
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
          />
        </div>
        {type === "products" && (
          <div className="input-container">
            <TextField
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              fullWidth={true}
              multiline={true}
              minRows={3}
            />
          </div>
        )}
        <div className="input-container">
          <Button
            disabled={
              !name ||
              !brand ||
              !category ||
              !worth ||
              !storage ||
              storage.length === 0 ||
              !img ||
              error ||
              (type === "products" && !description) //||
              //   (type === "products" && !img2) ||
              //   (type === "products" && !img3)
            }
            fullWidth={true}
            size="large"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpload;
