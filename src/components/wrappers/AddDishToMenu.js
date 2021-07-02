import React, { useState, useEffect } from "react";
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
        width: '50vw',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function AddDishToMenu({ MenuID, HomeCookID ,close}) {
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
        await api.getDishesByHomecookID(id).then((res) => { console.log(res); setDishes(res) });
    }
    return (
       
        <div className="p-3 bg-white px-auto rounded">
            <p className="h2 mx-3 px-auto bold">Add dishes to menu</p>
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
            <div style={{height:'50px',width:"100%", textAlign:'right'}} c>
            <button className="btn btn-primary mx-3" onClick={() => { checked.map((id) => { api.addDishToMenu(id, MenuID); console.log(id); console.log(MenuID);close(); }) }}>
                Add to menu
            </button>
            <button className="btn btn-primary mx-auto" onClick={() => {close()}}>
                Cancel
            </button>
            </div>
        </div>
    );
}
