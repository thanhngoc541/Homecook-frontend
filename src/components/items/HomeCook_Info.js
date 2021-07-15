
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { useEffect, useState } from 'react';
import api from "../../api";
export default function HomeCookInfo() {
    let[total, setTotal]= useState();
    let[countCustomer, setCountCustomer]= useState();
    let[countHomecook, setcountHomecook]= useState();
    const  getTotalCount = async () => {
        await api.getTotalCount().then((response) => {
            setTotal(response);
        })
    };
    const getCustomer = async () => {
        await api.countByRole("customer").then((response) => {
            setCountCustomer(response);
        })
    }
    const getHomecook = async () => {
        await api.countByRole("homecook").then((response) => {
            setcountHomecook(response);
        })
    }
    useEffect(() => {
        getTotalCount();
        getCustomer();
        getHomecook();
    },[]);
    console.log(total);
    console.log(countCustomer, countHomecook);

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
                        <span className="featuredNumber">{total}</span>
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
                        <span className="featuredNumber">{countCustomer}</span>
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
                        <span className="featuredNumber">{countHomecook}</span>
                    </div>
                    <span className="featureSub">Current Dish</span>
                </div>
            </div>
           
            
        </div>
    );
}