import React, { useState, useReducer, useEffect } from "react";
import Images from "../images/imagejson";
// import "./custom.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { faWarning } from "@fortawesome/free-solid-svg-icons";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import PropTypes from "prop-types";
let rendercount = 1;
let screendetail = {}

export default function WebFormDetails(props) {

  let screenJson = JSON.parse(sessionStorage["Screen Details"])

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  var contdata = require("./control.json");


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

  let settitle = screenJson["Screen".concat(rendercount.toString())]
  var scrcontroldata = contdata["Screen".concat(rendercount).toString()];
  const [txtlst, setTxtLst] = useState([]);
  const [btnlst, setBtnLst] = useState([]);
  const [checklst, setChkLst] = useState([]);
  const [cmbolst, setComboLst] = useState([]);
  const [rdiolst, setRadioLst] = useState([]);
  const [data, setData] = useState('');

  let handleButtonText = (lst, e, index) => {
    lst[index] = e.target.value
    console.log(lst)

  }

  useEffect(() => {
    Object.keys(scrcontroldata).forEach(function (key) {
      if (key == "TextBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          txtlst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "CheckBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // checkCount(chkcount+1)
          checklst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "ComboBoxes") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // comboCount(combocount+1)
          cmbolst.push(Object.values(scrcontroldata[key])[i]);
        }
      } else if (key == "RadioButton") {
        for (let i = 0; i < Object.keys(scrcontroldata[key]).length; i++) {
          // radioCount(radiocount+1)
          rdiolst.push(Object.values(scrcontroldata[key])[i]);
        }
      }
    });
    if (buttonlst !== undefined) {
      setBtnLst(buttonlst);
    }
  }, [rendercount]);
  const back = () => {
    navigate("/newform");
  };

  const handletxtChange = (event) => {
    textCount(txtcount);
    textCount(event.target.value);
  };
  function confirmNextScreen() {
    let screenDetail = {}
    screenDetail['title'] = document.getElementById("title").value;
    if (txtlst.length !== 0) {
      screenDetail['textboxes'] = txtlst;
    }
    if (btnlst.length !== 0) {
      screenDetail['buttons'] = btnlst;
    }
    if (checklst.length !== 0) {
      screenDetail['checkboxes'] = checklst;
    }
    if (cmbolst.length !== 0) {
      screenDetail['comboboxes'] = cmbolst;
    }
    if (rdiolst.length !== 0) {
      screenDetail['radiobuttons'] = rdiolst;
    }
    console.log(screenDetail)
    setTxtLst([])
    setBtnLst([])
    screendetail["Screen".concat(rendercount.toString())] = screenDetail
    if (rendercount < parseInt(sessionStorage['No Of Screen'])) {
      rendercount = rendercount + 1;
      forceUpdate();
    } else {
      sessionStorage.setItem("Screen Details", JSON.stringify(screendetail));
      console.log(sessionStorage)
      navigate(`/home`);
    }
  }
  function handleClick() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui shadow-lg p-3 mb-5 bg-white rounded'>
            <div className="row">
              <div className="col-md-2">


                <FontAwesomeIcon className="warningicon" icon={faWarning} />
              </div>
              <div className="col-md-10 msgcontent">

                <h1>Are you Sure about screen details?</h1>
                <p className="pmsg">You cant change the title of screens in next steps. <br /> Please make sure your screen titles.</p>

              </div>
              <div className="buttonsec">
                <button className="btn btn-primary btn-sm msgbtn" onClick={onClose}>No</button>
                <button className="btn btn-primary btn-sm msgbtn"
                  onClick={() => {
                    confirmNextScreen()
                    onClose();
                  }}
                >
                  Yes, Continue!
                </button>
              </div>

            </div>

          </div>
        );
      }
    });


  }
  const [txtcount, textCount] = useState(textlst.length);
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
                        id="title"
                        value={settitle}
                        placeholder="Default input"
                      />
                    </div>
                    <div className="innerformcomp1">
                      <div className="controlsection">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                TextBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {txtcount == 0
                                  ? textlst.map((textlst, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"


                                          aria-label=".form-control-sm example"
                                          defaultValue={textlst}
                                        />
                                      </li>
                                    ))
                                  : txtlst.map((txtindex, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        onChange={e => handleButtonText(txtlst, e, index)}
                                          aria-label=".form-control-sm example"
                                        defaultValue={txtindex}
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

                                    ? (contdata.Screen1.TextBoxes != undefined ? contdata.Screen1.TextBoxes.length : 0)
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
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                ComboBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {combocount == 0
                                  ? combolst.map((combolst, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={combolst}
                                        />
                                      </li>
                                    ))
                                  : cmbolst.map((comboindex, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        onChange={e => handleButtonText(cmbolst, e, index)}

                                          aria-label=".form-control-sm example"
                                        defaultValue={comboindex}
                                        />
                                      </li>
                                    ))}
                              </ul>
                            </div>
                            <div className="number text-right controlnumberconter">
                              <button
                                className="minus controlcc"
                                onClick={() => {
                                  comboCount(cmbolst - 1);
                                  cmbolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  combocount == 0
                                    ? (contdata.Screen1.ComboBoxes != undefined ? contdata.Screen1.ComboBoxes.length : 0)
                                    : cmbolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  comboCount(combocount + 1);
                                  cmbolst.push("combobox");
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
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                CheckBoxes
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {chkcount == 0
                                  ? chklst.map((chklst, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={chklst}
                                        />
                                      </li>
                                    ))
                                  : checklst.map((checkindex, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        onChange={e => handleButtonText(checklst, e, index)}

                                          aria-label=".form-control-sm example"
                                        defaultValue={checkindex}
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
                                  checklst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  chkcount == 0
                                    ? (contdata.Screen1.CheckBoxes != undefined ? contdata.Screen1.CheckBoxes.length : 0)

                                    : checklst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  checkCount(chkcount + 1);
                                  checklst.push("checkbox");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                RadioButtons
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {radiocount == 0
                                  ? radiolst.map((radiolst, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                          aria-label=".form-control-sm example"
                                          defaultValue={radiolst}
                                        />
                                      </li>
                                    ))
                                  : rdiolst.map((radioindex, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        onChange={e => handleButtonText(rdiolst, e, index)}
                                          aria-label=".form-control-sm example"
                                        defaultValue={radioindex}
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
                                  rdiolst.pop();
                                }}
                              >
                                -
                              </button>
                              <input
                                className="counterinput cnterblue"
                                type="text"
                                value={
                                  radiocount == 0
                                    ? (contdata.Screen1.RadioButtons != undefined ? contdata.Screen1.RadioButtons.length : 0)

                                    : rdiolst.length
                                }
                                onChange={handletxtChange}
                              />
                              <button
                                className="plus controlcc"
                                onClick={() => {
                                  radioCount(radiocount + 1);
                                  rdiolst.push("radiobox");
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
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Buttons
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                {btncount == 0

                                  ? buttonlst.map((btnlst, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        id={index}

                                          aria-label=".form-control-sm example"
                                          defaultValue={btnlst}
                                        />
                                      </li>
                                    ))
                                  : btnlst.map((btnindex, index) => (
                                      <li>
                                        <input
                                        className="dropdown-item form-control form-control-sm"
                                          type="text"
                                        // onKeyPress={handleInputChange}
                                        id={"btnlst".concat(index.toString())}
                                        onChange={e => handleButtonText(btnlst, e, index)}

                                          aria-label=".form-control-sm example"
                                        defaultValue={btnindex}
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
                                  // console.log(btnlst);
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
                                  // console.log(btnlst);
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
                    className="btn btn-outline-primary"
                  >
                    Back
                  </button>
                </div>

                <div className="col-md-6">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-primary"
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
