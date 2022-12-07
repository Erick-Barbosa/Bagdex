import { Component } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./Buttons/ButtonBack";
import ButtonSession from "./Buttons/ButtonSession";
import SessionLight from "./SessionLight";
import './PageListUser.css'
import UserService from "../Services/UserService";
import SearchUser from "./SearchUser";

const initialState = {
    userList: [],
    error: null,
    buttonCounter: 0
}

class PageListUser extends Component {
    state = {...initialState}

    componentDidMount() {
        UserService.getUserList()
            .then(data => 
                {this.setState({ userList: data })
            }, 
            (error) => {
                this.setState({ error: error })
            }
        )
    }

    showButtons = (id) => {
        document.getElementById("s"+id).style.visibility = "visible"
        document.getElementById("c"+id).style.visibility = "visible"
        this.setState({ buttonCounter: this.state.buttonCounter + 1})
        console.log(this.state.buttonCounter + 1)
    }

    hideButtons = (user, shouldSave) => {
        var saveButton = document.getElementById("s"+user.id)
        var cancelButton = document.getElementById("c"+user.id)
        var dropdownRoles = document.getElementById("roles"+user.id)

        if(shouldSave){
            user.role = dropdownRoles.options[dropdownRoles.selectedIndex].text
            UserService.changeUser(user)
            if(this.state.buttonCounter - 1 == 0)
                window.location.reload()
        }
        else
            dropdownRoles.selectedIndex = 0 

        this.setState({ buttonCounter: this.state.buttonCounter - 1 })
        saveButton.style.visibility = "hidden"
        cancelButton.style.visibility = "hidden"
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
                                        id={"roles"+user.id} 
                                        onChange={e => this.showButtons(user.id)}
                                        >
                                            <option id={user.id} hidden defaultValue={user.role}>{user.role}</option>
                                            <option value="usuario">Usuário</option>
                                            <option value="pesquisador">Pesquisador</option>
                                            <option value="administrador">Administrador</option>
                                    </select>
                                </div>
                                <div className="cancelButton" id={"c"+user.id} onClick={e => this.hideButtons(user, false)}>
                                    ❌
                                </div>
                                <div className="saveButton" id={"s"+user.id} onClick={e => this.hideButtons(user, true)}>
                                    ✅
                                </div>
                            </div>)
                        })}
                    </div>
                    )
                    : <div className="list"><h2 className="title">Algo inesperado aconteceu. Verifique sua autorização</h2></div>}
                    <SearchUser list={this.state.userList} showButtons={this.showButtons} hideButtons={this.hideButtons}/>
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