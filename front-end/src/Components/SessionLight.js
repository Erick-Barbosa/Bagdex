export default function SessionLight(props) {
    if(props.isLogged)  
        return <div id="miniLightAuth"/>
    else 
        return <div id="miniLightNoAuth"/>
}