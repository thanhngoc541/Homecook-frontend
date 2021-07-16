import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

//----------------------------------
const StatusBar = ({ statuses, filterOrders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [filterState, setFilterState] = useState('All');
    //---------
    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         '& > *': {
    //             margin: theme.spacing(0.3),

    //         },
    //     },
    // }));
    const useStyles = makeStyles({
        root: {
            flexGrow: 1,
            maxWidth: 1500,
            // backgroundColor: ,
        },
    });
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
        <Paper square >
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="icon label tabs example"
            >
                {statuses.map((status, index) => {
                    return (
                        <Tab key={index} onClick={() => { filterOrders(status); setFilterState(status) }} label={status} />
                    );
                })}
            </Tabs>
        </Paper>
        </div>
    );

};
export default StatusBar;
