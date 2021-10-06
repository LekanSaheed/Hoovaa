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
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { useHistory } from "react-router";
import { GlobalContext } from "../../../reducers/context";

const RegisterGadget = () => {
  const { state } = GlobalContext();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const generateCode = () => {
    const char =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charLength = char.length;
    for (let i = 0; i <= 16; i++) {
      result += char.charAt(Math.floor(Math.random() * charLength));
    }

    const hoovaaCode = "HV-" + result;
    console.log(hoovaaCode);
    return hoovaaCode;
  };

  const history = useHistory();
  const registerGadget = () => {
    if (!state.isUser) {
      toast.error("You have to log in first!!");
      history.push("/login");
    }
    const generatedCode = generateCode();
    setCode(generatedCode);
    const dbRef = db.collection("registeredGadgets").doc();
    dbRef
      .set({
        name,
        model,
        brand,
        price,
        code,
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
        <Button
          fullWidth="true"
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
