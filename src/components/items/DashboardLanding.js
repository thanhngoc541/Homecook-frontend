import NavBarDashBoard from "./NavBarDashBoard";
import { getToken, onMessageListener } from '../../firebase';
import React, { useState } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';


export default function Dashboard() {
    return (
        <div>
            <NavBarDashBoard />
        </div>
    );
}
