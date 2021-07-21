import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Fade } from "react-animation-components";
import { Link } from "react-router-dom";
import "../../css/utilities.css";
import "../../css/menu.css";
import api from "../../api";
import Path from "path";
import uploadFileToBlob, {
  isStorageConfigured,
} from "../../api/upload-img/azure-storage-blob";

const Menu = ({ menu, close, isCreate, save }) => {
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
    console.log(event.target.files[0].name);
    setFileSelected(event.target.files[0]);
  };

  const resetState = () => {
    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer = await uploadFileToBlob(fileSelected);
    console.log(blobsInContainer);

    // prepare UI for results
    setBlobList(blobsInContainer);
    setUploadedFile(
      blobsInContainer.find((b) => b.includes(fileSelected.name))
    );

    resetState();

    console.info(uploadedFile);
  };

  // display form
  const DisplayForm = () => (
    <div className="row">
      {uploadedFile ? (
        <img src={uploadedFile} alt={uploadedFile} height="200" />
      ) : (
        <img src={MenuURL} alt={MenuName} height="200" />
      )}
      <div className="col-6">
        <input type="file" onChange={onFileChange} key={inputKey || ""} />
      </div>
      <div className="col-3">
        <span type="submit" onClick={onFileUpload}>
          Upload
        </span>
      </div>
    </div>
  );

  var msg = "Update Menu";
  if (isCreate) {
    msg = "Create Menu";
  }
  const {
    MenuID,
    MenuName,
    HomeCookName,
    HomeCookID,
    MenuURL,
    MenuDescription,
    IsServing,
  } = menu;
  console.log(menu);
  //   console.log(IsServing);

  const handleSubmit = async () => {
    var form = document.getElementsByName("formmenu")[0];
    // console.log(form);
    var MenuName = form.elements["name"].value;
    var MenuURL = uploadedFile;
    console.log(uploadedFile);
    var MenuDescription = form.elements["des"].value;
    var IsServing = form.elements["IsServing"].value === "true";
    var newMenu = {
      MenuID,
      HomeCookName,
      HomeCookID,
      MenuName,
      MenuURL,
      MenuDescription,
      IsServing,
    };
    console.log(newMenu);
    await save(newMenu);
    close();
  };

  return (
    <Fade in>
      <div className="wrapper ">
        <div className="container">
          <article className="part card-details py-4">
            <span className="position-absolute fixed-top">
              <button
                className=" float-right btn border-0"
                onClick={() => {
                  close();
                }}
              >
                <i className=" fa fa-close .text-dark"></i>
              </button>
            </span>
            <h1 className="bg-success">{msg}</h1>
            <form name="formmenu" if="cc-form" autocomplete="off">
              <div className="group card-name">
                <label for="name">Menu Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  maxlength="20"
                  placeholder="Menu Name"
                  defaultValue={MenuName}
                />
              </div>
              <div className="group card-name">
                <label for="image">Menu Image</label>
                {<DisplayForm />}
              </div>
              <div className="group card-name">
                <label for="des">Description</label>
                <textarea
                  name="des"
                  type="text"
                  id="des"
                  placeholder="This food is very delicious"
                  defaultValue={MenuDescription}
                />
              </div>
              <div className="group card-name">
                <label for="serving">Status</label>
              </div>
              <div id="status">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="IsServing"
                    id="serving"
                    defaultChecked={IsServing}
                    value={true}
                  />
                  <label className="form-check-label" for="serving">
                    Serving
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="IsServing"
                    id="disable"
                    defaultChecked={!IsServing}
                    value={false}
                  />
                  <label className="form-check-label" for="disable">
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
                onClick={handleSubmit}
                disabled={uploading}
              >
                <i className=" fa fa-save .text-dark"></i> <span>Save</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </Fade>
  );
};
export default Menu;
