import axios from "axios";
const API_URL = "http://localhost:5085/api/BagdexUser/";
const setUserList = () => {
    return axios
        .post(API_URL + "userList")
        .then((response) => {
            console.log("response: " + JSON.stringify(response.data.token))
            if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const getUserList = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const UserService = {
    setUserList,
    getUserList,
};
    
export default UserService;