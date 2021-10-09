import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import {
  Box,
  Button,
  Modal,
  TextField,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { db, firebase } from "../../firebase";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../reducers/context";
import Select from "react-select";
import { type } from "./options";
const RegisterGadget = () => {
  const { state } = GlobalContext();
  const [gadget_type, setGadget_type] = useState(type[0]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [identifier, setIdentifier] = useState(null);
  const handleType = (gadget_type) => {
    setGadget_type(gadget_type);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const findImei = () => {
    const dbRef = db.collection("registeredGadgets");
    const docRef = dbRef.where("identifier", "==", identifier);

    const isSnap = docRef.get().then((snaps) => {
      if (snaps.exists) {
        console.log("exists");
        return true;
      }
      if (!snaps.exists) {
        console.log("Not exist");
        return false;
      }
    });
    return isSnap;
  };
  const generateCode = () => {
    const char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charLength = char.length;
    for (let i = 0; i <= 16; i++) {
      result += char.charAt(Math.floor(Math.random() * charLength));
    }

    const hoovaaCode = "HV-" + result;
    // console.log(hoovaaCode);
    return hoovaaCode;
  };

  const history = useHistory();

  const registerGadget = () => {
    if (!state.isUser) {
      toast.error("You have to log in first!!");
      history.push("/login");
    }
    findImei();

    const isFound = findImei();
    console.log(isFound);
    if (findImei()) {
      console.log("Gadget Already Exists");
    }
    if (!findImei()) {
      const generatedCode = generateCode();
      setCode(generatedCode);
      console.log(generatedCode);
      console.log("Didnt find anything");
      const dbRef = db.collection("registeredGadgets").doc();
      dbRef
        .set({
          name,
          model,
          brand,
          price,
          code: generatedCode,
          userId: state.currentUser.uid,
          type: gadget_type.value,
          identifier,
          created: firebase.firestore.Timestamp.now(),
        })
        .then(() => {
          const userDb = db.collection("users").doc(state.currentUser.uid);
          userDb.update({
            gadgetCode: code,
          });
        })
        .then(() => {
          setModal(true);
          setError("");
          setName("");
          setPrice("");
          setModel("");
          setBrand("");
        })
        .catch((err) => {
          setModal(true);
          setCode("");
          setError(err);
        });
    }
  };
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied Successfully");
  };

  return (
    <div>
      {modal && (
        <Modal
          open={modal}
          children={
            <Dialog
              open={modal}
              children={
                <DialogContent
                  children={
                    <div>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <BsCheckCircle />
                      </Box>
                      Yippie, your device is successfully registered.
                      <div>
                        This is your Hoovaa Code for your registered device
                      </div>
                      <Box
                        style={{
                          background: "#192841",
                          borderRadius: "5px",
                          color: "white",
                          fontWeight: "500",
                          fontSize: "13px",
                          fontFamily: "Montserrat",
                        }}
                        padding="10px"
                        display="flex"
                        gridGap="5px"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <span>{!error && code}</span>
                        <span
                          style={{ fontSize: "14px" }}
                          onClick={() => copyCode()}
                        >
                          <MdContentCopy />
                        </span>
                      </Box>
                      {error}
                      <div onClick={() => setModal(false)}>Close</div>
                    </div>
                  }
                />
              }
            />
          }
        />
      )}
      <div className="register-info">
        Fill out details of your device carefully and then click on register to
        generate your hoovaa code.
      </div>
      <div className="centered-text">Register Gadget</div>
      <Box display="flex" flexDirection="column" padding="10px" gridGap="20px">
        <label>Choose Device type</label>
        <Select
          isSearchable={false}
          value={gadget_type}
          defaultValue={type[0]}
          onChange={handleType}
          options={type}
          placeholder="Device type"
          theme={(theme) => ({
            ...theme,
            fontSize: "10px",
            padding: "20px",
            minHeight: "50px !important",
            zIndex: 10,
            colors: {
              ...theme.colors,
              primary25: "#7497ff",
              primary: "white",
            },
            backgroundColor: {
              ...theme.colors,
              primary25: "black",
              primary: "black",
            },
          })}
        />
        <TextField
          fullWidth={true}
          value={name}
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          placeholder="Device Name e.g(iPhone, Samsung)"
          required
          label="Device Name"
        />
        <TextField
          fullWidth={true}
          value={model}
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model "
          required
          label="Model"
        />
        <TextField
          fullWidth={true}
          value={brand}
          variant="outlined"
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand e.g(Apple, Samsung)"
          required
          label="Brand"
        />
        <TextField
          fullWidth={true}
          value={price}
          variant="outlined"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Device Price"
          required
          label="Price"
        />
        <TextField
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={`${
            (gadget_type.value === "phone" && "imei") ||
            (gadget_type.value === "tablet" && "imei") ||
            (gadget_type.value === "laptop" && "Serial Number") ||
            (gadget_type.value === "console" && "ID Number")
          }`}
          label={`${
            (gadget_type.value === "phone" && "IMEI") ||
            (gadget_type.value === "tablet" && "IMEI") ||
            (gadget_type.value === "laptop" && "SERIAL NUMBER") ||
            (gadget_type.value === "console" && "ID NUMBER")
          }`}
          type={`${
            (gadget_type.value === "phone" && "number") ||
            (gadget_type.value === "tablet" && "number") ||
            (gadget_type.value === "laptop" && "text") ||
            (gadget_type.value === "console" && "ID NUMBER")
          }`}
          variant="outlined"
          required
        />
        <Button
          fullWidth={true}
          variant="outlined"
          color="primary"
          size="large"
          onClick={registerGadget}
        >
          Register
        </Button>
      </Box>
    </div>
  );
};

export default RegisterGadget;
