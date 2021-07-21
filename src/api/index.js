/* eslint-disable import/no-anonymous-default-export */
const URL = "http://localhost:8080/Homecook";

async function getApi(url) {
  const res = await fetch(`${URL}${url}`, {
    method: "GET",
  });
  return await res.json();
}
function deleteApi(url, data) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
function postApi(url, data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
function putApi(url, data) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
export default {
  //-------------
  //----------ACCOUNT
  getAllAccountByRole(role) {
    return getApi(`/accounts/role/${role}`);
  },
  getAccountByID(id) {
    return getApi(`/accounts/id/${id}`);
  },
  countByRole(role) {
    return getApi(`/accounts/${role}`);
  },

  async login(data) {
    const response = await postApi("/accounts/login", data);
    return await response.json();
  },
  async register(data) {
    const response = await postApi("/accounts", data);
    return await response.json();
  },

  changeUserStatus(id, status) {
    return putApi(`/accounts/${id}/${status}`);
  },
  updateUserInfo(data) {
    return putApi(`/account`, data);
  },
  getSearchedAccount(name ,page) {
    return getApi(`/accounts/${name}/${page}`);
  },
  getTotalSearchedAccount (role, username) {
    return getApi(`/accounts/count/${role}/${username}`);
  },
  //-------------
  //----------DISH
  getTotalHomeCookDish(id) {
    return getApi(`/dishes/count/homecook/${id}`);
  },

  createDish(dish) {
    return postApi("/dishes", dish).then((res) => res.json());
  },

  updateDish(dish) {
    return putApi("/dishes", dish);
  },
  getDishesByHomecookID(id) {
    return getApi(`/dishes/homecook/${id}`);
  },
  async getDishesByStatus(status, page) {
    const response = await getApi(`/dishes/status/${status}/${page}`);
    return response;
  },
  deleteDish(DishId) {
    return deleteApi(`/dishes/${DishId}`);
  },
  countDishes(status) {
    return getApi(`/dishes/count/${status}`);
  },
  //Dishes api

  //------------
  //----------MENU
  addDishToMenu(DishId, MenuID) {
    return postApi(`/menu/dish`, { DishId, MenuID });
  },
  removeDishFromMenu(DishId, MenuID) {
    return deleteApi(`/menu/dish`, { DishId, MenuID });
  },
  deleteMenu(id) {
    return deleteApi(`/menu/${id}`, null);
  },
  getTotalHomeCookMenu(id) {
    return getApi(`/menu/count/homecook/${id}`);
  },
  getMenuByID(id) {
    return getApi(`/menu/${id}`);
  },
  getMenuByHomeCookID(id) {
    return getApi(`/menu/homecook/${id}`);
  },
  async createMenu(menu) {
    const response = await postApi("/menu", menu);
    return await response.json();
  },
  updateMenu(menu) {
    return putApi("/menu", menu);
  },
  getTopMenus() {
    return getApi("/menu/top");
  },
  getTotalSearchedMenu(name) {
    return getApi(`/menu/count/${name}`);
  },
  getSearchedMenu(name, page) {
    return getApi(`/menu/${name}/${page}`);
  },
  //-------------
  //-----------CUSTOMER
  getCustomerOrder(id) {
    return getApi(`/order/customer/${id}`);
  },
  getOrderByCustomerIDAndStatus(id, status, page) {
    return getApi(`/order/customer/${id}/${status}/${page}`);
  },
  // getOrderByHomeCookIDAndStatus(id, status, page) {
  //   return getApi(`/order/homecook/${id}/${status}/${page}`);
  // },
  countCustomerOrderByIDAndStatus(id, status) {
    return getApi(`/order/count/customer/${id}/${status}`);
  },
  countHomeCookOrderByIDAndStatus(id, status, name) {
    return getApi(`/order/count/homecook/${id}/${status}/${name}`);
  },
  //-------------
  //----------ORDER

  getOrderById(id) {
    return getApi(`/order/byId/${id}`);
  },
  getSevenOrder() {
    return getApi("/order/first");
  },
  getAllOrder(name, page) {
    return getApi(`/order/orders/${name}/${page}`);
  },
  getOrdersByHomeCookIDAndStatus(HomeCookID, status, name, page) {
    console.log(`/order/homecook/${HomeCookID}/${status}/${name}/${page}`);
    return getApi(`/order/homecook/${HomeCookID}/${status}/${name}/${page}`);
  },
  getOrderByDateRangeAndStatus(fromDate, toDate, status, page) {
    return getApi(`/order/orders/${fromDate}/${toDate}/${status}/${page}`);
  },
  getOrderByDateRange(fromDate, toDate, page) {
    return getApi(`/order/orders/${fromDate}/${toDate}/${page}`);
  },
  getTotalCount(name) {
    return getApi(`order/count/${name}`);
  },
  getHomeCookOrder(id,name, page) {
    return getApi(`/order/homecook/${id}/${name}/${page}`);
  },
  getTotalHomeCookOrder(id) {
    return getApi(`/order/count/homecook/${id}`);
  },
  createOrder(order) {
    return postApi("/order", order);
  },
  changeOrderStatus(id, status) {
    return putApi(`/order/updateStatus/${id}/${status}`);
  },
  getOrderItems(id) {
    return getApi(`/order/item/${id}`);
  },
  getOrderByStatus(status, input, page) {
    return getApi(`/order/orders/${status}/${input}/${page}`);
  },
  countAllOrderByStatus(status, name) {
    return getApi(`/order/count/orders/${status}/${name}`);
  },
  countOrderByDateRangeAndStatus(fromDate, toDate, status) {
    return getApi(`/order/count/orders/${fromDate}/${toDate}/${status}`);
  },
  countOrderItem(orderID) {
    return getApi(`/order/count/${orderID}/items`);
  },
};
