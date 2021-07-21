import React, { useState, useEffect } from "react";

import { Fade } from "react-animation-components";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import api from "../../api";
import Swal from "sweetalert2";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '300px',
        overflowY: 'scroll',
        marginBottom : '20px'
    },
}));

export default function AddDishToMenu({ handleAddDish, HomeCookID, close }) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        getDishesByHomeCookID(HomeCookID);
        console.log(close);
    }, [])

    const handleToggle = (value) => () => {
       // var value=dishes[index].DishId;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked);
        setChecked(newChecked);
    };
    const getDishesByHomeCookID = async (id) => {
        await api.getDishesByHomecookID(id).then((res) => { console.log(res); setDishes(res.filter((dish) => dish.IsAvailable)) });
    }
    return (

        <Fade in>
            <div class="wrapper">
                <div class="container" style={{height: "50vh"}}>
                    <article class="part card-details py-4">
                        <span className="position-absolute fixed-top"><button className=" float-right btn border-0" onClick={() => { close() }}>
                            <i class=" fa fa-close .text-dark"></i>
                        </button></span>
                        <h1 className="bg-success">
                            Add dishes to menu
                        </h1>

                        {/* <form action="" if="cc-form" autocomplete="off"> */}
                        <div styles={{ height: '300px !important', overflowY: 'scroll', whiteSpace: "nowrap" }} >
                            
                        <List  dense className={[classes.root,"cart-items"]}>
                            {dishes.map((dish, index) => {
                                const labelId = `checkbox-list-secondary-label-${index}`;
                                return (
                                    <ListItem key={index} button onClick={handleToggle(index)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={"Dish"}
                                                src={dish.ImageURL}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={dish.DishName} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(index)}
                                                checked={checked.indexOf(index) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                color='default'
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}

                        </List>
                        </div>
                        <div style={{ height: '50px', width: "100%", textAlign: 'right' }} >
                            <button className="rounded-pill btn btn-success  mx-3" onClick={() => {
                                checked.map((index) => {
                                    handleAddDish(dishes[index]);
                                     close();
                                })
                            }}>
                                <i class=" fa fa-plus .text-dark"></i> <span>Add</span>
                            </button>
                        </div>
                        {/* </form> */}
                    </article>
                    {/* <div class="part bg"></div> */}
                </div>
            </div>
        </Fade >

    );
}
