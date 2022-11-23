export default function SessionButton(props) {
    if(props.isLoggedText == "Login")  
    return <div id="miniButtonGlassNoAuth"></div>
    else 
        <div id="miniButtonGlassAuth"></div>
}