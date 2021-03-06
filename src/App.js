import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';
import { onMessageListener } from './firebase';
function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', message: '' });
  const toggle = () => setShow(!show);
  //---------
  onMessageListener().then((payLoad) => {
    setShow(true);
    setNotification({ title: payLoad.data.title, message: payLoad.data.message });
    console.log(payLoad);
    console.log(notification);
  }).catch(err => console.log('failed: ', err));
  return (
    <BrowserRouter>
      <div>
        {
          !show ? null : (
            <Toast className="toast" isOpen={show} animation style={{
              position: 'absolute',
              top: '6rem',
              right: '0rem',
              minWidth: 200,
            }}>
              <ToastHeader toggle={toggle}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded mr-2"
                  alt=""
                />
                <strong>{notification.title}</strong>
                <small className="ms-2">just now</small>
              </ToastHeader>
              <ToastBody>{notification.message}</ToastBody>
            </Toast>
          )
        }
        <Main />
      </div>
    </BrowserRouter>
  );
}
export default App;
