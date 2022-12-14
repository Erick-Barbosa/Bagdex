import axios from "axios";
const loggedUser = JSON.parse(localStorage.getItem("user"));
const urlApiUser = "http://localhost:5085/api/BagdexUser/";
async function getUserList() {
    return await
        axios.get(urlApiUser + "userList", { headers: { Authorization: 'Bearer ' + loggedUser.token } })
            .then(resp => {
                return resp.data
            }
            )
};

const changeUser = (user) => {
    return axios
        .put(urlApiUser + "changeUserRole?userId=" + user.id,
            user,
            { headers: { Authorization: 'Bearer ' + loggedUser.token } })
        .then(data => console.log(data))
}

const UserService = {
    getUserList,
    changeUser,
};

export default UserService;