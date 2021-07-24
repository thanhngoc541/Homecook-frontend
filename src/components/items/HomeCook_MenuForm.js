import { Card } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Button,
  CardBody,
  Row,
  CardHeader,
  Col,
} from "reactstrap";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import api from "../../api/index";
import Path from "path";
import uploadFileToBlob from "../../api/upload-img/azure-storage-blob";
function MenuForm
  ({ Menu, close, isCreate, save }) {
  console.log(Menu);
  
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
  const {
    HomeCookID,
    MenuName,
    IsServing,
    HomeCookName,
    Servings,
    Price,
    MenuURL,
    MenuDescription
  } = Menu;
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
        <img src={uploadedFile} alt={uploadedFile} height="150px" width="150px" />
      ) : (
        <img src={MenuURL} alt={MenuName} height="150px" width="150px" />
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    data.IsServing = data.IsServing === 'true' ? true : false;
    data.MenuURL = uploadedFile?uploadedFile:MenuURL; 
    data.HomeCookID = Menu.HomeCookID;
    data.MenuID=Menu.MenuID;
    data.HomeCookName=Menu.HomeCookName
    console.log(data);
    save(data);
  };

  return (
    <div className="regis-wrapper regis-wrapper--w680 ">

      <Card className="card-4">
        <CardHeader className="d-flex justify-content-center p-5 form-card-header">
          {isCreate ? "Create menu" : "Update menu"}
        </CardHeader>
        <CardBody className="card-body">
          <Form onSubmit={handleSubmit((data) => submitHandler(data))}>
            <div className="p-0 m0" styles={{ height: '300px !important', width: '90%', overflowY: 'scroll', whiteSpace: "nowrap" }} >
              {/* Username & Password */}
              <div className="cart-items  m-0" style={{width:'105%'}}>
                <div  className="ml-1"style={{width:'95%'}}>
                  <Row className="space">
                    <div className="col-md-6">
                      <FormGroup className="input-group">
                        <label className="label">Menu Name</label>
                        <input
                          className="input--style-4"
                          type="text"
                          defaultValue={MenuName}
                          {...register("MenuName", {
                            required: "This is required",
                            maxLength: {
                              value: 20,
                              message: "You exceeded the max length",
                            },
                            minLength: {
                              value: 1,
                              message: "Minimum is 1 characters",
                            },
                          })}
                        />
                        {errors.MenuName && (
                          <p className="text-danger">{errors.MenuName.message}</p>
                        )}
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup className="input-group">
                        <label className="label w-50">Price</label>

                        <input
                          defaultValue={Price}
                          className="input--style-4"
                          type="number"
                          step="0.01"
                          {...register("Price", {
                            required: "This is required",
                            min: 0,
                          })}
                        />
                        {errors.Price && (
                          <p className="text-danger">{errors.Price.message}</p>
                        )}
                      </FormGroup>
                    </div>
                  </Row>
                  {/* First Name & Last name */}
                  <Row className="row-space">
                    <label className="label w-50">Menu Image</label>
                    <DisplayForm />

                  </Row>
                  <Row className="row-space">

                    <div className="col-md-12">
                      <FormGroup className="input-group">
                        <label className="label">Description</label>

                        <textarea
                          className="input--style-4 w-100"
                          type="text"

                          defaultValue={MenuDescription}
                          {...register("MenuDescription", {
                            required: "This is required"

                          })}
                        />
                        {errors.MenuDescription && (
                          <p className="text-danger">{errors.MenuDescription.message}</p>
                        )}
                      </FormGroup>
                    </div>
                  </Row>
                  {/* Role  */}
                  <Row className="row-space">
                    <div className="col-md-6">
                      <FormGroup className="input-group">
                        <label className="label">Servings</label>
                        <input
                          className="input--style-4"
                          type="text"
                          defaultValue={Servings}
                          {...register("Servings", {
                            required: "This is required",
                            pattern: {
                              value: /[0-9]*-[0-9]*/,
                              message:
                                "Servings partern: x-y (ex: 1-2)",
                            },
                          })}
                        />
                        {errors.Servings && (
                          <p className="text-danger">{errors.Servings.message}</p>
                        )}
                      </FormGroup>
                    </div>
                    <Col md={6}>
                      <FormGroup className="input-group row">
                        <label className="label col-12">Status</label>
                        <div className="p-t-10 col-12">
                          <label className="radio-container mr-3">
                            Active
                            <input
                              {...register("IsServing", { required: true })}
                              type="radio"
                              name="IsServing"
                              value={true}
                              defaultChecked={IsServing}

                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="radio-container">
                            InActive
                            <input
                              {...register("IsServing", { required: true })}
                              type="radio"
                              name="IsServing"
                              defaultChecked={!IsServing}
                              value={false}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>  </div>
            </div>

            {/* Buttons */}
            <div className="p-t-15">
              <Button
                color="success"
                className="px-5 py-2 border-radius float-right"
                type="submit"
                disabled={uploading}
              >
                Submit
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default MenuForm
  ;
