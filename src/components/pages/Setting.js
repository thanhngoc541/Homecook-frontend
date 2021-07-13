import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary() {
  let [selected, setSelected] = useState("home");
  const nava = () => {
    console.log(selected)
    return (
      <ul>
        <li ><button onClick={() => setSelected("home1")}>1</button></li>
        <li><button onClick={() => setSelected("home2")}>12</button></li>
        <li ><button onClick={() => setSelected("home3")}>13</button></li>
        <li><button onClick={() => setSelected("home4")}>1</button></li>
      </ul>
    );
  };
  const main = () => {
    if (selected === "home1") return <div>State1</div>
    if (selected === "home2") return <div>State2</div>
    if (selected === "home3") return <div>State3</div>
    if (selected === "home4") return <div>State4</div>
  }
  return (
    <div>
      {nava()}
      {main()}
    </div>
  );
}
