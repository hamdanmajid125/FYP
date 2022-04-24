import React, { useState, useReducer, useEffect } from "react";
import Images from "../images/imagejson";
// import "./custom.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";
let rendercount = 1;
let proceedButton = false;

// function useForceUpdate(proceedButton) {
//   console.log("here");
//   console.log(proceedButton);
//   let navigate = useNavigate();
//   const [value, setValue] = useState(rendercount); // integer state
//   if (value < 3) {
//     rendercount = rendercount + 1;
//     return () => setValue((value) => value + 1); // update the state to
//   } else {
//     navigate(`/webform`);
//   }
// }

export default function WebFormDetails(props) {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("reload");

  var contdata = require("./control.json");
  var scrdata = require("./json.json");

  let btnobj = scrdata["BUTTONS"]["Screen".concat(rendercount)];

  let navigate = useNavigate();
  var textlst =
    contdata["Screen".concat(rendercount).toString()]["TextBoxes"] !== undefined
      ? contdata["Screen".concat(rendercount).toString()]["TextBoxes"]
      : [];
  var chklst =
    contdata["Screen".concat(rendercount).toString()]["CheckBoxes"] !==
    undefined
      ? contdata["Screen".concat(rendercount).toString()]["CheckBoxes"]
      : [];
  var combolst =
    contdata["Screen".concat(rendercount).toString()]["ComboBoxes"] !==
    undefined
      ? contdata["Screen".concat(rendercount).toString()]["ComBoxes"]
      : [];
  var radiolst =
    contdata["Screen".concat(rendercount).toString()]["RadioButtons"] !==
    undefined
      ? contdata["Screen".concat(rendercount).toString()]["RadioButtons"]
      : [];
  var buttonlst =
    contdata["Screen".concat(rendercount).toString()]["Buttons"] !== undefined
      ? contdata["Screen".concat(rendercount).toString()]["Buttons"]
      : [];

  Object.keys(btnobj).forEach(function (key) {
    buttonlst.push(btnobj[key]);
  });

  let settitle = scrdata["SCREENS"]["Screen".concat(rendercount.toString())];
  var scrcontroldata = contdata["Screen".concat(rendercount).toString()];
  const [txtlst, setTxtLst] = useState([]);
  const [btnlst, setBtnLst] = useState([]);

  useEffect(() => {
    Object.keys(scrcontroldata).forEach(function (key) {
      if (key == "TextBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          txtlst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "CheckBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // checkCount(chkcount+1)
          chklst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "ComboBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // comboCount(combocount+1)
          combolst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "RadioButton") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // radioCount(radiocount+1)
          radiolst.push(Object.values(scrcontroldata[key])[i]);
        }
      }
    });
    if (buttonlst !== undefined) {
      setBtnLst(buttonlst);
    }
  }, []);

  const back = () => {
    navigate("/newform");
  };

  const handletxtChange = (event) => {
    textCount(txtcount);
    textCount(event.target.value);
  };
  function handleClick() {
    if (rendercount < 3) {
      rendercount = rendercount + 1;
      forceUpdate();
    } else {
      navigate(`/home`);
    }
  }
  const [txtcount, textCount] = useState(txtlst.length);
  const [chkcount, checkCount] = useState(chklst.length);
  const [combocount, comboCount] = useState(combolst.length);
  const [btncount, btnCount] = useState(buttonlst.length);
  const [radiocount, radioCount] = useState(radiolst.length);

  return (
    <>
      <Navbar title="PRO-VISION" profileID={1426363} user="Kevin Smith" />
      <div className="container webformcontainer">
        <h2 className="h2headingplan text-center">
          <span className="fontblue">Digital is new Default.</span> Every thing
          happens on screen
        </h2>
        <div className="inner text-left">
          <div className="row">
            <div className="col-md-2">
              <div className="flex">
                <img src={Images.home.leftimage} alt="" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="relativerectangle">
                <div className="mainformcard rounded-left shadow-lg card px-0 pt-4 pb-0 mt-3 mb-3">
                  <div className="innerform">
                    {/* form start */}
                    <div className="innerformcomp1 tilescreen">
                      <h5 className="h5form1 scrtitlehead">
                        Screen Title {rendercount}
                      </h5>
                      <input
                        className="shadow p-3 form-control scrititle"
                        type="text"
                        defaultValue={settitle}
                        placeholder="Default input"
                      />
                    </div>
                    <div className="innerformcomp1">
                      <div className="controlsection">
                        <div className="row">
                          <div className="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                TextBoxes
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {txtcount == 0
                                  ? textlst.map((textlst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={textlst}
                                        />
                                      </li>
                                    ))
                                  : txtlst.map((txtlst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={txtlst}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  textCount(txtcount - 1);
                                  txtlst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  txtcount == 0
                                    ? contdata.Screen1.TextBoxes.length
                                    : txtlst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  textCount(txtcount + 1);
                                  txtlst.push("textbox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                ComboBoxes
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {txtcount == 0
                                  ? combolst.map((combolst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={combolst}
                                        />
                                      </li>
                                    ))
                                  : txtlst.map((combolst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={combolst}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  comboCount(combocount - 1);
                                  combolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  combocount == 0
                                    ? contdata.Screen1.ComboBoxes == undefined
                                      ? 0
                                      : null
                                    : combolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  comboCount(combocount + 1);
                                  txtlst.push("combobox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                CheckBoxes
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {chkcount == 0
                                  ? chklst.map((chklst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={chklst}
                                        />
                                      </li>
                                    ))
                                  : chklst.map((chklst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={chklst}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  checkCount(chkcount - 1);
                                  chklst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  chkcount == 0
                                    ? contdata.Screen1.CheckBoxes == undefined
                                      ? 0
                                      : null
                                    : chklst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  checkCount(chkcount + 1);
                                  chklst.push("checkbox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                RadioButtons
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {radiocount == 0
                                  ? radiolst.map((radiolst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={radiolst}
                                        />
                                      </li>
                                    ))
                                  : radiolst.map((radiolst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={radiolst}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  radioCount(radiocount - 1);
                                  radiolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  radiocount == 0
                                    ? contdata.Screen1.RadioBoxes == undefined
                                      ? 0
                                      : null
                                    : radiolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  radioCount(radiocount + 1);
                                  txtlst.push("radiobox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Buttons
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {btncount == 0
                                  ? buttonlst.map((btnlst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={btnlst}
                                        />
                                      </li>
                                    ))
                                  : btnlst.map((btnlst, index) => (
                                      <li>
                                        <input
                                          class="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={btnlst}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  btnCount(btncount - 1);
                                  btnlst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  btncount == 0
                                    ? contdata.Screen1.TextBoxes.length
                                    : btncount
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  btnCount(btncount + 1);
                                  btnlst.push("button");
                                  console.log(btnlst);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="rectangleimg">
                  <img src={Images.home.rectangle} alt="" />
                </div> */}
            </div>
            <div className="col-md-3">
              <div className="flex">
                <img src={Images.home.rightimage} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="buttongroups">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={back}
                    class="btn btn-outline-primary"
                  >
                    Back
                  </button>
                </div>

                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={handleClick}
                    class="btn btn-primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="cloud" src={Images.home.cloud} alt="" />
    </>
  );
}
WebFormDetails.propTypes = {
  count: PropTypes.number,
};
WebFormDetails.defaultProps = {
  count: 0,
};
