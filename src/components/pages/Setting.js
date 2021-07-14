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
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["a"]);

  const abc= ()=>{
    <ul>
      <li>1</li>
      <li>2</li>
    </ul>
  }

  return (
    <div>
      {abc}
    </div>
  );
}
