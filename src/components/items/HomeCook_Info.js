
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { useEffect, useState } from 'react';
import OrderMain from "../pages/HomeCook_Order";
import api from "../../api";
export default function HomeCookInfo({ HomeCookID }) {
    let [orderCount, setOrderCount] = useState();
    let [menuCount, setMenuCount] = useState();
    let [dishCount, setDishCount] = useState();
    let [page, setPage] = useState();
    const getTotalHomeCookOrder = async () => {
        await api.countHomeCookOrderByIDAndStatus(HomeCookID, "Pending", "all").then((response) => {
            setOrderCount(response);
        })
    };
    const getTotalHomeCookMenu = async () => {
        await api.getTotalHomeCookMenu(HomeCookID).then((response) => {
            setMenuCount(response);
        })
    }
    const getTotalHomeCookDish = async () => {
        await api.getTotalHomeCookDish(HomeCookID).then((response) => {
            setDishCount(response);
        })
    }
    useEffect(() => {
        getTotalHomeCookOrder();
        getTotalHomeCookMenu();
        getTotalHomeCookDish();
    }, []);
    function handleCLick(page) {
        console.log(page);
        if (page === "order") {
            return <OrderMain />
        }
    }

    return (
        <div className="featured" >
            <button className="featuredItem" style={{ textAlign: "left" }} onClick={() => { setPage("order"); handleCLick(page) }}>
                <div>
                    <ShoppingCartIcon fontSize="large" className="featuredIcon" />
                </div>
                <div>
                    <span className="featuredTitle">Order</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{orderCount}</span>
                    </div>
                    <span className="featureSub" style={{ fontWeight: "bold", textAlign: "left" }}>Pending</span>
                </div>
            </button>
            <div className="featuredItem">
                <div className="left-card">
                    <LibraryBooksIcon fontSize="large" className="icon" />
                </div>
                <div className="right-card">
                    <span className="featuredTitle">Menu</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{menuCount}</span>
                    </div>
                    <span className="featureSub" style={{ fontWeight: "bold" }}>Current Menu</span>
                </div>

            </div>
            <div className="featuredItem">
                <div>
                    <RestaurantIcon fontSize="large" className="icon" />
                </div>
                <div>
                    <span className="featuredTitle">Dish</span>
                    <div className="featuredNumberContainer">
                        {/* dua ham count user by role */}
                        <span className="featuredNumber">{dishCount}</span>
                    </div>
                    <span className="featureSub" style={{ fontWeight: "bold" }}>Current Dish</span>
                </div>
            </div>


        </div>
    );
}