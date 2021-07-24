import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import {
  Input,
  InputGroup,
  Button,
  Col,
  Navbar,
  Nav,
  NavItem,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
} from "reactstrap";
import { Fade } from "react-animation-components";
import { Link } from "react-router-dom";
import "../../css/utilities.css";
import "../../css/menu.css";
import api from "../../api";
import Path from "path";
import uploadFileToBlob from "../../api/upload-img/azure-storage-blob";



const DishForm = ({ Dish, close, isCreate, save }) => {
  // all blobs in container
  const [blobList, setBlobList] = useState([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));
  const [uploadedFile, setUploadedFile] = useState("");

  const onFileChange = (event) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);
    setUploadedFile(blobsInContainer[blobsInContainer.length - 1]);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));

    console.info(uploadedFile);
  };

  // display form
  const DisplayForm = () => (
    <div>
      {!!uploadedFile ? (
        <span>{Path.basename(uploadedFile)}</span>
      ) : (
        <div className=''>
          <input type="file" onChange={onFileChange} key={inputKey || ""} />
          <button type="submit" onClick={onFileUpload}>
            Upload
          </button>
        </div>
      )}
    </div>
  );

  var msg = "Update Dish";
  if (isCreate) {
    msg = "Create Dish";
  }
  const {
    DishId,
    Price,
    DishName,
    HomeCookID,
    IsAvailable,
    Description,
    ImageURL,
  } = Dish;

  const handleSave = async () => {
    var form = document.getElementsByName("formdish")[0];
    console.log(form);
    var DishName = form.elements["name"].value;
    var ImageURL = blobList[blobList.length - 1];
    var Description = form.elements["des"].value;
    var IsAvailable = form.elements["IsServing"].value === "true";
    var Price = parseFloat(form.elements["price"].value);

    var dish = {
      DishId,
      Price,
      HomeCookID,
      DishName,
      ImageURL,
      Description,
      IsAvailable,
    };
    console.info(dish);
    await save(dish);
    close();
  };

  return (
    <Fade in>
      <div class="wrapper">
        <div class="container">
          <article class="part card-details py-4">
            <span className="position-absolute fixed-top">
              <button
                className=" float-right btn border-0"
                onClick={() => {
                  close();
                }}
              >
                <i class=" fa fa-close .text-dark"></i>
              </button>
            </span>
            <h1 className="bg-success">{msg}</h1>
            <form
              style={{
                height: "300px",
                overflowY: "scroll",
              }}
              className="cart-items"
              name="formdish"
              if="cc-form"
              autocomplete="off"
            >
              <div class="group card-name">
                <label for="name">Dish Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxlength="20"
                  placeholder="Dish Name"
                  defaultValue={DishName}
                />
              </div>
              <div class="group card-name">
                <label for="image">Dish Image</label>
                 <DisplayForm />
              </div>
              <div class="group card-name">
                <label for="price">Price</label>
                <input
                  name="price"
                  type="number"
                  id="price"
                  step="0.01"
                  maxlength="20"
                  placeholder="Price"
                  defaultValue={Price}
                />
              </div>
              <div class="group card-name">
                <label for="des">Description</label>
                <input
                  name="des"
                  type="text"
                  id="des"
                  maxlength="20"
                  placeholder="Description"
                  defaultValue={Description}
                />
              </div>
              <div class="group card-name">
                <label for="serving">Status</label>
              </div>
              <div id="status">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="IsServing"
                    id="serving"
                    defaultChecked={IsAvailable}
                    value={true}
                  />
                  <label class="form-check-label" for="serving">
                    Serving
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="IsServing"
                    id="disable"
                    defaultChecked={!IsAvailable}
                    value={false}
                  />
                  <label class="form-check-label" for="disable">
                    Disable
                  </label>
                </div>
              </div>
            </form>
            <div
              style={{
                height: "50px",
                width: "100%",
                textAlign: "right",
                marginTop: "15px",
              }}
            >
              <button
                className="btn btn-success rounded-pill mx-0"
                disabled={uploading}
                onClick={handleSave}
              >
                <i class=" fa fa-save .text-dark"></i> <span>Save</span>
              </button>
            </div>
          </article>
          {/* <div class="part bg"></div> */}
        </div>
      </div>
    </Fade>
  );
};
export default DishForm;
