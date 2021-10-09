import {
  Button,
  Dialog,
  DialogContent,
  Input,
  Modal,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { db, firebase } from "../components/firebase";
import { GlobalContext } from "../reducers/context";

const ProfileSettings = () => {
  const { state } = GlobalContext();
  // const user = firebase.auth().currentUser
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  //   const [photoURL, setPhotoUrl] = useState('')
  const [userEmail, setEmail] = useState(state.currentUser.email);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFile = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .updateProfile({
            displayName: name,
            photoURL: photo,
          })
          .then(() => {
            setSuccess("Succesfully Updated profile");
            setError("");
          })
          .catch((err) => {
            setError(err.message, err.code);
          });
      }
      if (user) {
        user
          .updateEmail({
            email: userEmail,
          })
          .then((user) => {
            db.collection("users").doc(user.uid).update({ email: userEmail });
            setSuccess("Succesfully Updated profile");
            setError("");
          })
          .catch((err) => {
            setSuccess("");
            setError(err.message, err.code);
          });
      }
    });
  };

  return (
    <div>
      <div className="centered-text">Update Profile</div>
      <form style={{ padding: "10px", lineHeight: "70px" }}>
        <Modal
          children={
            <Dialog
              open={error || success}
              children={
                <DialogContent>
                  {" "}
                  {error && error}
                  {success && success} <br />
                  <Button
                    variant="contained"
                    size="small"
                    color={`${error ? "secondary" : "primary"}`}
                    onClick={() => {
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Ok
                  </Button>{" "}
                </DialogContent>
              }
            />
          }
          open={error || success}
        />
        <div>
          <TextField
            variant="outlined"
            fullWidth={true}
            required
            value={name}
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            fullWidth={true}
            required
            type="file"
            onChange={handleFile}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            fullWidth={true}
            required
            value={userEmail}
            label="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          disabled={!userEmail || !photo || !name}
          onClick={handleUpdate}
          fullWidth={true}
          variant="contained"
          color="primary"
          endIcon={<AiOutlineUpload />}
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default ProfileSettings;
