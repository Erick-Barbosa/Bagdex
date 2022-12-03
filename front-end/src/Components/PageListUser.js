import axios from "axios";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./Buttons/ButtonBack";
import ButtonSession from "./Buttons/ButtonSession";
import SessionLight from "./SessionLight";
import './PageListUser.css'

const urlApiBagmon = "http://localhost:5085/api/BagdexUser/userList"
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    userList: [],
    error: null
}


class PageListUser extends Component {
    state = {...initialState}

    async componentDidMount() {
        await axios(urlApiBagmon, { headers: { Authorization: 'Bearer ' + user.token}})
            .then(resp => {
                this.setState({ userList: resp.data })
            },
            (error) => {
                const _mens =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                    this.setState({ error: _mens })
            }
        )
    }

    getOption(id) {
        var value = document.getElementById("roles")
        var text = value.options[0].text
        var valueValue = value.options[1]
        document.getElementById("s"+id).style.visibility = "visible"
        document.getElementById("c"+id).style.visibility = "visible"
    }

    hideButtons(id, shouldSave) {
        document.getElementById("s"+id).style.visibility = "hidden"
        document.getElementById("c"+id).style.visibility = "hidden"
    }

    goTo = (location) => {
        this.props.navigate(location)
    }

    render() {
        var userList = this.state.userList
        var error = this.state.error

        return (
          <div id="pokedex">
            <div id="left" >
                <div id="bg_curve1_left"></div>
                <div id="bg_curve2_left"></div>
                <div id="curve1_left">
                    <div id="buttonGlass">
                      <div id="reflect"> </div>
                    </div>
                    <SessionLight isLogged={this.props.isLogged}/>
                </div>
                <div id="curve2_left">
                    <ButtonSession text={this.props.text}/>
                <ButtonBack/>
                    {!error ? (
                    <div className="list">
                        <h2 className="title">Lista de usuários</h2>
                        {userList.map( (user) => {
                            return (<div className="container">
                                <div className="userElement">
                                    <strong>Usuário:</strong> {user.username}
                                </div>
                                <div className="userElement">
                                    <strong>Cargo:</strong>
                                    <select 
                                        name="roles" 
                                        className="roles" 
                                        id="roles" 
                                        onChange={e => this.getOption(user.id)}
                                        >
                                            <option value="original" hidden selected>{user.role}</option>
                                            <option value="usuario">Usuário</option>
                                            <option value="pesquisador">Pesquisador</option>
                                            <option value="administrador">Administrador</option>
                                    </select>
                                </div>
                                <div className="saveButton" id={"s"+user.id} onClick={e => this.hideButtons(user.id)}>
                                    ❌
                                </div>
                                <div className="cancelButton" id={"c"+user.id} onClick={e => this.hideButtons(user.id)}>
                                    ✅
                                </div>
                            </div>)
                        })}
                    </div>
                    )
                    : <div className="list"><h2 className="title">{error}</h2></div>}
                </div>
            </div>
            <div id="right">
                <div id="bg_curve1_right"></div>
                <div id="bg_curve2_right"></div>
                <div id="curve1_right">
                </div>
                <div id="curve2_right"></div>
            </div>
          </div>
        )
    };
}

export default function(props) {
    const navigate = useNavigate()

    return <PageListUser {...props} navigate={navigate}/>
}