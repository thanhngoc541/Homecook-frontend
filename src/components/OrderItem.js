import React from 'react';


export const Modal = ( {showModal, setShowModal}) => {
    return (
        <>
        {showModal ? (
            <h1>Order item</h1>
        ) : null }
        </>
    );
};
export default Modal;