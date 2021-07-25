
import "firebase/messaging";/* eslint-disable import/no-anonymous-default-export */
const URL = "http://localhost:8080/Homecook";
const URLFirebase = "https://fcm.googleapis.com/fcm/send";
//-----------------------
async function getApi(url) {
  const res = await fetch(`${URL}${url}`, {
    method: "GET",
  });
  return  res.json();
}
function deleteApi(url, data) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(`${URL}${url}`, requestOptions);
}
function postFirebaseApi(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": " key= AAAAjItJ9Is:APA91bHyEwb-f_31Nw-2V9mZb_ArT57xT-X7hwFuwX05zuwHfiuebi3QzdACxxDQzzNAt_5fbn8jgJ2Je-0DE4LwMNNZfFzW7RKavb_y1e-Carj0aKdvlByejRzbkgpiUQ584bh1QSRo",
    },
    body: JSON.stringify(data),
  }
  return fetch(`${URLFirebase}`, requestOptions);
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
  setAccountToken(data) {
    return putApi(`/accounts/updateToken`,data);
  },
  updateUserInfo(data) {
    return putApi(`/accounts`, data);
  },
  getSearchedAccount(role, name, page) {
    return getApi(`/accounts/${role}/${name}/${page}`);
  },
  getTotalSearchedAccount(role, username) {
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
  async getDishesByStatus(status, name, page) {
    const response = await getApi(`/dishes/status/${status}/${name}/${page}`);
    return response;
  },
  deleteDish(DishId) {
    return deleteApi(`/dishes/${DishId}`);
  },
  countDishes(status, name) {
    return getApi(`/dishes/count/${status}/${name}`);
  },
  //Dishes api

  //------------
  //----------MENU
  changeMenuStatus(MenuID, Status) {
    return putApi(`/menu/${MenuID}/${Status}`);
  },
  changeDishStatus(DishID, Status) {
    return putApi(`/dishes/${DishID}/${Status}`);
  },
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
  getCustomerOrder(id, page, input) {
    return getApi(`/order/customer/${id}/${input}/${page}`);
  },
  getOrderByCustomerIDAndStatus(id, status, name, page) {
    return getApi(`/order/customer/${id}/${status}/${name}/${page}`);
  },
  // getOrderByHomeCookIDAndStatus(id, status, page) {
  //   return getApi(`/order/homecook/${id}/${status}/${page}`);
  // },
  countCustomerOrderByIDAndStatus(id, status, name) {
    return getApi(`/order/count/customer/${id}/${status}/${name}`);
  },
  countHomeCookOrderByIDAndStatus(id, status, name) {
    return getApi(`/order/count/homecook/${id}/${status}/${name}`);
  },
  countCustomerOrder(id) {
    return getApi(`/order/count/customer/${id}`);
  },
  //-------------
  //----------ORDER
  getOrderByWeek (id) {
    return getApi(`/order/sales/${id}`);
  },
  getOrderByWeekAdmin() {
    return getApi(`/order/sales`);
  },
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
    return getApi(`/order/orders/date/${page}`);
  },
  getTotalCount(name) {
    return getApi(`/order/count/${name}`);
  },
  getHomeCookOrder(id, name, page) {
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

  //------------FIREBASE
  sendNotification(data) {
    return postFirebaseApi(data);
  }
};
