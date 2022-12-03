import { Component } from "react";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./Buttons/ButtonBack";
import ButtonSession from "./Buttons/ButtonSession";
import SessionLight from "./SessionLight";
import AuthService from "../Services/AuthService";
import './PageUser.css'
import UserInfo from "./UserInfo";

class PageUser extends Component {
    
    userInfo = AuthService.getCurrentUser()

    goTo = (location) => {
        this.props.navigate(location)
    }

    render() {
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
                </div>
                <UserInfo info={this.userInfo}/>
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

    return <PageUser {...props} navigate={navigate}/>
}