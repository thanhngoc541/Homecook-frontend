import React from 'react'
import { useGlobalContext } from './context';
import Swal from "sweetalert2";


export default function CartItem({ DishId, ImageURL, DishName, Price, quantity }) {
  const { remove, toggleAmount } = useGlobalContext();


  const handleDelete = () => {
    if(quantity === 1){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          toggleAmount(DishId, "dec")
          Swal.fire(
            "Deleted!",
            "Your item has been deleted.",
            "success"
          );
        }
      });
    }else toggleAmount(DishId, "dec");
  };

  return (
    <article className="cart-item">
      <img src={ImageURL} alt={DishName} />
      <div>
        <h4>{DishName}</h4>
        <h4 className="item-price">${Price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => remove(DishId)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          className="amount-btn"
          onClick={() => toggleAmount(DishId, "inc")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        {/* amount */}
        <p className="amount">{quantity}</p>
        {/* decrease amount */}
        <button className="amount-btn" onClick={() => handleDelete()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
