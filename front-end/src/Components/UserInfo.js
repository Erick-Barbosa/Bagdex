export default function(props) {
    if(props.info)
    return (
        <div className="infoBox">
            <h1 className="title">Perfil</h1> 
            <div className="infoContent">
                <strong>Nome de usuário:</strong> {props.info.user.username}<br/>
                <strong>Cargo:</strong> {props.info.user.role}
            </div>
        </div>
    )
    else 
    return (
        <div className="infoBox">
            <h1>Perfil</h1> 
            Você precisa estar logado para acessar as informações
        </div>
    )
}