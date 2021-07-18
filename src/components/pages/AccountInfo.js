import { Card } from "@material-ui/core";
import React, { useState, useEffect } from "react";
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

function AccountInfo({ registerAccount }) {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    const [data, setData] = useState({});

    const getInfo = () => {
        if (userData != null) {
            api.getAccountByID(userData.UserID).then((res) => {
                setData(res);
                console.log(data);
            })
        }
    }
    useEffect(() => {
        getInfo();
    }, data);
    const dob = new Date(data.DoB);
    const info = {
        Username: data.Username,
        Email: data.Email,
        DoB: dob,
        Address: data.Address,
        PhoneNumber: data.PhoneNumber,
        FullName: data.FullName
    };
    return (
        <div className="regis-wrapper regis-wrapper--w680 ">
            <Card className="card-4">
                <CardHeader className="d-flex justify-content-center p-5 form-card-header">
                    Account Information
                </CardHeader>
                <CardBody className="card-body">
                    {
                        <Form>
                            {/* Username & Password */}
                            <Row className="space">
                                <div className="col-md-6">
                                    <FormGroup className="input-group">
                                        <label className="label">Username</label>
                                        <input
                                            className="input--style-4"
                                            type="text"
                                            value={info.Username}
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup className="input-group">
                                        <label className="label">Password</label>
                                        <input
                                            className="input--style-4"
                                            type="password"
                                            value="******"
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row className="row-space">
                                <div className="col-md-6">
                                    <FormGroup className="input-group">
                                        <label className="label">Birthday</label>
                                        <input
                                            className="input--style-4"
                                            type="text"
                                            value={dob.toLocaleDateString()}
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup className="input-group">
                                        <label className="label">Phone Number</label>
                                        <input
                                            className="input--style-4"
                                            type="text"
                                            value={info.PhoneNumber}
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            {/* First Name & Last name */}
                            <Row className="space">
                                <div className="col-md-12">
                                    <FormGroup className="input-group row">
                                        <label className="label col-12">Full Name</label>
                                        <div className="col-12">
                                            <input
                                                className="input--style-4 w-100"
                                                type="text"
                                                value={info.FullName}
                                                readOnly
                                            />
                                        </div>
                                    </FormGroup>
                                </div>
                            </Row>

                            {/* Email */}
                            <Row className="space">
                                <FormGroup className="input-group row">
                                    <div className="col-12">
                                        <label className="label">Email</label>
                                    </div>
                                    <div className="col-12">
                                        <input
                                            className="input--style-4 w-100"
                                            type="email"
                                            value={info.Email}
                                            readOnly
                                        />
                                    </div>
                                </FormGroup>
                            </Row>
                            {/* Address */}
                            <Row className="space">
                                <div className="col-md-12">
                                    <FormGroup className="input-group row">
                                        <label className="label col-12">Address</label>
                                        <div className="col-12">
                                            <input
                                                className="input--style-4 w-100"
                                                type="text"
                                                value={info.Address}
                                                readOnly
                                            />
                                        </div>
                                    </FormGroup>
                                </div>
                            </Row>
                            <div className="d-flex flex-column p-t-15">
                                <Link to="/home" className="regis-txt3 mt-3">
                                    Back to home
                                </Link>
                            </div>
                        </Form>
                    }
                </CardBody>
            </Card>
        </div>
    );
}

export default AccountInfo;
