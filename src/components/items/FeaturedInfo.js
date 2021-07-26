
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { useEffect, useState } from 'react';
import api from "../../api";
export default function FeaturedInfo() {
    let [total, setTotal] = useState(0);
    let [countCustomer, setCountCustomer] = useState(0);
    let [countHomecook, setcountHomecook] = useState(0);
    const getTotalCount = async () => {
        await api.getTotalOrderByWeek().then((response) => {
            console.log(response);
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
    }, [])

    useEffect(() => {
        getHomecook();
    }, [])


    useEffect(() => {
        getCustomer();
    }, []);
    console.log(total);
    console.log(countCustomer, countHomecook);

    return (
        <div className="featured">
            <div className="featuredItem">
                <div>
                    <ShoppingCartIcon fontSize="large" className="featuredIcon" />
                </div>
                <div>
                    <span className="featuredTitle">Order</span>
                    <div className="featuredNumberContainer">
                        <span className="featuredNumber">{total}</span>
                    </div>
                    <span className="featureSub">Total order of a week</span>
                </div>
            </div>
            <div className="featuredItem">
                <div className="left-card">
                    <PeopleAltIcon fontSize="large" className="icon" />
                </div>
                <div className="right-card">
                    <span className="featuredTitle">Customer</span>
                    <div className="featuredNumberContainer">
                        <span className="featuredNumber">{countCustomer}</span>
                    </div>
                    <span className="featureSub">Current Customer</span>
                </div>
            </div>
            <div className="featuredItem">
                <div>
                    <RestaurantIcon fontSize="large" className="icon" />
                </div>
                <div>
                    <span className="featuredTitle">Homecook</span>
                    <div className="featuredNumberContainer">
                        <span className="featuredNumber">{countHomecook}</span>
                    </div>
                    <span className="featureSub">Current Homecook</span>
                </div>
            </div>
        </div>
    );
}