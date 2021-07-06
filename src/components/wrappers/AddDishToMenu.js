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
const useStyles = makeStyles((theme) => ({
    root: {
        height: '320px'
    },
}));

export default function AddDishToMenu({ MenuID, HomeCookID, close }) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);
    const [dishes, setDishes] = useState([]);
    useEffect(() => {
        getDishesByHomeCookID(HomeCookID);
        console.log(close);
    }, [])

    const handleToggle = (value) => () => {
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
                <div class="container">
                    <article class="part card-details py-4">
                        <span className="position-absolute fixed-top"><button className=" float-right btn border-0" onClick={() => { close() }}>
                            <i class=" fa fa-close .text-dark"></i>
                        </button></span>
                        <h1>
                            Add dishes to menu
                        </h1>

                        {/* <form action="" if="cc-form" autocomplete="off"> */}
                        <List dense className={[classes.root]}>
                            {dishes.map((dish, index) => {
                                const labelId = `checkbox-list-secondary-label-${index}`;
                                return (
                                    <ListItem key={index} button onClick={handleToggle(dish.DishId)}>
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
                                                onChange={handleToggle(dish.DishId)}
                                                checked={checked.indexOf(dish.DishId) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                color='default'
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}

                        </List>
                        <div style={{ height: '50px', width: "100%", textAlign: 'right' }} >
                            <button className="rounded-pill btn btn-primary btn-menu mx-3" onClick={() => { checked.map((id) => { api.addDishToMenu(id, MenuID); console.log(id); console.log(MenuID); close(); }) }}>
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
