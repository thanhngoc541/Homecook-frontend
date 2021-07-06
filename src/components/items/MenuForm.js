import React from "react";
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
    CardImg
} from "reactstrap";
import { Fade } from "react-animation-components";
import { Link } from "react-router-dom";
import '../../css/utilities.css';
import '../../css/menu.css';
import api from "../../api";
const Menu = ({ menu, close, isCreate,save }) => {
    var msg = "Update Menu";
    if (isCreate) { msg = "Create Menu"; }
    const { MenuID, MenuName, HomeCookName, HomeCookID, MenuURL, MenuDescription, IsServing } = menu;
    console.log(menu);
    return (
        <Fade in>
            <div class="wrapper">
                <div class="container">
                    <article class="part card-details py-4">
                        <span className="position-absolute fixed-top"><button className=" float-right btn border-0" onClick={() => { close() }}>
                            <i class=" fa fa-close .text-dark"></i>
                        </button></span>
                        <h1>
                            {msg}
                        </h1>
                        <form name="formmenu" if="cc-form" autocomplete="off">
                            <div class="group card-name">
                                <label for="name">Menu Name</label>
                                <input type="text" id="name" name="name" class="" type="text" maxlength="20" placeholder="Menu Name" defaultValue={MenuName} />
                            </div>
                            <div class="group card-name">
                                <label for="image">Menu Image</label>
                                <input name="image" type="text" id="image" class="" type="text" maxlength="20" placeholder="URL" defaultValue={MenuURL} />
                            </div>
                            <div class="group card-name">
                                <label for="des">Description</label>
                                <input name="des" type="text" id="des" class="" type="text" maxlength="20" placeholder="Description" defaultValue={MenuDescription} />
                            </div>
                            <div class="group card-name">
                                <label for="serving">Status</label>
                            </div>
                            <div id="status">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="IsServing" id="serving" defaultChecked={IsServing} value={true} />
                                    <label class="form-check-label" for="serving">Serving</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="IsServing" id="disable" defaultChecked={!IsServing} value={false} />
                                    <label class="form-check-label" for="disable">Disable</label>
                                </div>
                            </div>

                        </form>
                        <div style={{ height: '50px', width: "100%", textAlign: 'right', marginTop: '15px' }}>
                            <button className="btn btn-menu  mx-0" onClick={async () => {
                                var form = document.getElementsByName("formmenu")[0];
                                console.log(form);
                                var MenuName = form.elements["name"].value;
                                var MenuURL = form.elements["image"].value;
                                var MenuDescription = form.elements["des"].value;
                                var IsServing = form.elements["IsServing"].value;
                                var menu = {
                                    MenuID,
                                    HomeCookName,
                                    HomeCookID,
                                    MenuName,
                                    MenuURL,
                                    MenuDescription,
                                    IsServing
                                }
                                await save(menu);
                                close();
                            }}>
                                <i class=" fa fa-save .text-dark"></i> <span>Save</span>
                            </button>

                        </div>
                    </article>
                    {/* <div class="part bg"></div> */}

                </div>
            </div>
        </Fade >
    );
};
export default Menu;
