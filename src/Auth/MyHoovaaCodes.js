import React, { useState } from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { db } from "../components/firebase";
import { GlobalContext } from "../reducers/context";

const MyHoovaaCodes = () => {
  const { state } = GlobalContext();
  const [code, setCode] = useState();
  React.useEffect(() => {
    const userRef = db.collection("users").doc(state.currentUser.uid);
    userRef.onSnapshot((snap) => {
      setCode(snap.gadgetCode);
    });
  });
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}></Route>
      <div className="centered-text">
        You can check codes for all your hoovaa actions here
      </div>
      <Link to={url + "/registered-gadgets-code"}>
        Registered Gadget(s) code(s)
        <br />
        {code}
      </Link>
      <Route path={path + "/registered-gadgets-code"}></Route>
    </Switch>
  );
};

export default MyHoovaaCodes;
