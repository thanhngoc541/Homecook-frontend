import NavBarDashBoard from "./NavBarDashBoard";
import { getToken, onMessageListener } from '../../firebase';
import React, { useState } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


export default function Dashboard() {
    // getToken();
    const [show, setShow] = useState(false);
    const [isTokenFound, setTokenFound] = useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const toggle = () => setShow(!show);
    return (
        <div>
            {
                isTokenFound ? console.log("OKAY") : console.log("FAILED")
            }
            {
                !show ? null : (
                    <Toast isOpen={show} animation style={{
                        position: 'inherit',
                        top: 20,
                        right: 20,
                        minWidth: 200
                    }}>
                        <ToastHeader toogle={toggle}>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded mr-2"
                                alt=""
                            />
                            <strong className="mr-auto">{notification.title}</strong>
                            <small>just now</small>
                        </ToastHeader>
                        <ToastBody>{notification.body}</ToastBody>
                    </Toast>

                )
            }
            <NavBarDashBoard />
        </div>
    );
}
