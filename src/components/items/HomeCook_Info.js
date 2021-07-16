
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { useEffect, useState } from 'react';
import api from "../../api";
export default function HomeCookInfo({HomeCookID}) {
    let[orderCount, setOrderCount]= useState();
    let[menuCount, setMenuCount]= useState();
    let[dishCount, setDishCount]= useState();
    const  getTotalHomeCookOrder = async () => {
        await api.getTotalHomeCookOrder(HomeCookID).then((response) => {
            setOrderCount(response);
        })
    };
    const getTotalHomeCookMenu = async () => {
        await api.getTotalHomeCookMenu(HomeCookID).then((response) => {
            setMenuCount(response);
        })
    }
    const getTotalHomeCookDish = async () => {
        await api.getTotalHomeCookDish  (HomeCookID).then((response) => {
            setDishCount(response);
        })
    }
    useEffect(() => {
        getTotalHomeCookOrder();
        getTotalHomeCookMenu();
        getTotalHomeCookDish();
    },[]);


    return (
        <div className="featured">
             <div className="featuredItem">
                <div>
                    <ShoppingCartIcon fontSize="large"  className="featuredIcon"/>
                </div>
                <div>
                    <span className="featuredTitle">Order</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{orderCount}</span>
                    </div>
                    <span className="featureSub">Current order</span>
                </div>
            </div>
            <div className="featuredItem">
                <div className="left-card">
                    <LibraryBooksIcon fontSize="large"  className="icon"/>
                </div>
                <div className="right-card">
                    <span className="featuredTitle">Menu</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{menuCount}</span>
                    </div>
                    <span className="featureSub">Current Menu</span>
                </div>

            </div>
            <div className="featuredItem">
                <div>
                    <RestaurantIcon  fontSize="large"  className="icon"/>
                </div>
                <div>
                    <span className="featuredTitle">Dish</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{dishCount}</span>
                    </div>
                    <span className="featureSub">Current Dish</span>
                </div>
            </div>
           
            
        </div>
    );
}