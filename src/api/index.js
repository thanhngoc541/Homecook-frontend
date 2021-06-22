
export default {
    getMenus() {
        return fetch("http://localhost:8080/Homecook_war_exploded/menu", {
            method: 'GET'
        })
            .then(res => res.json());
    },
    getMenuByID(id) {
        return fetch(`http://localhost:8080/Homecook_war_exploded/menu/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
    },
    getMenuByHomeCookID(id){
        return fetch("http://localhost:8080/Homecook_war_exploded/menu/homecook/" + { id }, {
            method: 'GET'
        })
            .then(res => res.json())
    }
};



