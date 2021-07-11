/* eslint-disable import/no-anonymous-default-export */
const URL = "http://localhost:8080/Homecook_war_exploded";

function getApi(url) {
  return fetch(`${URL}${url}`, {
    method: "GET",
  }).then((res) => res.json());
}
function deleteApi(url,data) {
  const requestOptions = {
    method: 'DELETE',
     //   headers: { 'Content-Type': 'application/json' ,
       // 'Access-Control-Allow-Headers':'Content-Type'
       //     },
        body: JSON.stringify(data)
  };
  fetch(`${URL}${url}`, requestOptions).then((response) => response.json());
}
function postApi(url, data) {
  const requestOptions = {
    method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
        'Access-Control-Allow-Headers':'Content-Type'
            },
        body: JSON.stringify(data)
  };
  fetch(`${URL}${url}`, requestOptions).then((response) => response.json());
}
function putApi(url, data) {
  const requestOptions = {
   
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  };
  fetch(`${URL}${url}`, requestOptions).then((response) => response.json());
}
export default {
  addDishToMenu(DishId, MenuID) {
    return postApi(`/menu/dish`,{DishId,MenuID});

  }
  ,removeDishFromMenu(DishId, MenuID) {
    return deleteApi(`/menu/dish`,{DishId,MenuID});

  }
  ,
  deleteMenu(id)
  {
    return deleteApi(`/menu/${id}`,null);
  }
  ,
  getCustomerOrder(id) {
    return getApi(`/order/customer/${id}`);
  },
  getHomeCookOrder(id) {
    return getApi(`/order/homecook/${id}`);
  },
  getOrderItems(id) {
    return getApi(`/order/item/${id}`);
  },
  getMenus() {
    return getApi("/menu");
  },
  getMenuByID(id) {
    return getApi(`/menu/${id}`);
  },
  getMenuByHomeCookID(id) {
    return getApi(`/menu/homecook/${id}`);
  },
 createMenu(menu) {
    return postApi("/menu", menu);
  },
  updateMenu(menu){
    return putApi("/menu",menu);
  },
  //Dishes api
  getDishesByHomecookID(id) {
    return getApi(`/dishes/homecook/${id}`);
  },
  getDishesByStatus(status){
    return getApi(`/dishes/status/${status}`)
  },
  createOrder(order){
    return postApi("/order",order);
  }
  
};
