import React, { useState } from "react";
import "./DeviceDetails.css";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ItemEvaluation from "./ItemEvaluation";
import { GlobalContext } from "../../../reducers/context";

const DeviceDetails = ({ device }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { path, url } = useRouteMatch();
  const { setDeviceStorage, formatBytes } = GlobalContext();
  const [selectedStorage, setSelected] = useState(null);
  return (
    <Switch>
      <Route exact path={path}>
        <div className="device-details-page">
          <div
            style={{
              margin: "15px",
              fontWeight: "500",
              fontSize: "18px",
              marginLeft: "0",
            }}
          >
            Sell your {device ? device.map((item) => item.name) : "Device"}
          </div>
          {device.map((item, index) => {
            console.log(item);
            return (
              <div key={index} className="device-details-container">
                <div className="device-details-flex">
                  <div className="grid-img">
                    {" "}
                    <img src={item.img} alt="brand" />
                  </div>
                  <div>
                    <div className="device-name">{item.name}</div>
                    <div className="device-brand">{item.brand.value}</div>
                    <span className="theme-text">Select storage</span>
                  </div>
                </div>
                <div className="storage-grid">
                  {item.storage &&
                    item.storage.map((storage, id) => {
                      console.log(storage);
                      return (
                        <label className="grid-item-storage" key={id}>
                          <input
                            type="radio"
                            name="deviceStorage"
                            value={formatBytes(parseInt(storage.value))}
                            onChange={(e) => setSelected(e.target.value)}
                          />{" "}
                          {formatBytes(parseInt(storage.value))}
                        </label>
                      );
                    })}
                </div>
                <Link
                  to={`${url + "/evaluation"}`}
                  onClick={() =>
                    setTimeout(() => {
                      setDeviceStorage(
                        item.name + " " + selectedStorage,
                        item.img,
                        item.price
                      );
                    }, 3000)
                  }
                >
                  <button
                    style={{
                      backgroundColor: `${
                        !selectedStorage ? "lightblue" : "#7497ff"
                      }`,
                    }}
                    className="btn-eval"
                    disabled={!selectedStorage}
                  >
                    Continue
                  </button>{" "}
                </Link>
              </div>
            );
          })}
        </div>
      </Route>
      <Route path={`${path + "/evaluation"}`}>
        <ItemEvaluation />
      </Route>
    </Switch>
  );
};

export default DeviceDetails;
