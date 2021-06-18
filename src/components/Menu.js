import React, { useState, useEffect } from "react";

function Menu() {
  const [text, setText] = useState("Default Text");
  useEffect( () => {
    let headers = new Headers();

  // headers.append('Content-Type', 'application/json');
  // headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  // headers.append('Access-Control-Allow-Methods','GET');
  // headers.append('Access-Control-Allow-Credentials', 'true');

  // headers.append('GET', 'POST', 'OPTIONS');
     fetch("http://localhost:3001/api/hello",{
      // mode: 'no-cors',
      // credentials: 'include',
      method: 'GET',
      headers: headers
    })
      .then(res => res.json())
      .then(
        (result) => {
          setText(result.MenuName);
          console.log(result);
        },
        (error) => {
          // setText(error);
        }
      )
  });
  return (
    <div className="container">
      <h1>Menu</h1>
      <p>{text}</p>
    </div>
  );
}

export default Menu;
