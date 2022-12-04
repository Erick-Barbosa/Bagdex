import UserService from "../Services/UserService"

const UserComponent = (userParams) => {

    var counter = 0

    const showButtons = (id) => {
        document.getElementById(id+"s").style.visibility = "visible"
        document.getElementById(id+"c").style.visibility = "visible"
        counter += 1
    }

    const hideButtons = (user, shouldSave) => {
        var saveButton = document.getElementById(user.id+"s")
        var cancelButton = document.getElementById(user.id+"c")
        var dropdownRoles = document.getElementById(user.id+"rolesSearch")

        counter -= 1 
        if(shouldSave){
            user.role = dropdownRoles.options[dropdownRoles.selectedIndex].text
            UserService.changeUser(user)
            if(counter == 0)
                window.location.reload()
        }
        else
            dropdownRoles.selectedIndex = 0 

        
        saveButton.style.visibility = "hidden"
        cancelButton.style.visibility = "hidden"
    }

    return (<div className="container">
        <div className="userElement">
            <strong>Usuário:</strong> {userParams.user.username}
        </div>
        <div className="userElement">
            <strong>Cargo:</strong>
            <select 
                name="rolesSearch" 
                className="rolesSearch" 
                id={userParams.user.id+"rolesSearch"} 
                onChange={e => showButtons(userParams.user.id)}
                >
                    <option id={userParams.user.id} hidden defaultValue={userParams.user.role}>{userParams.user.role}</option>
                    <option value="usuario">Usuário</option>
                    <option value="pesquisador">Pesquisador</option>
                    <option value="administrador">Administrador</option>
            </select>
        </div>
        <div className="cancelButton" id={userParams.user.id+"c"} onClick={e => hideButtons(userParams.user, false)}>
            ❌
        </div>
        <div className="saveButton" id={userParams.user.id+"s"} onClick={e => hideButtons(userParams.user, true)}>
            ✅
        </div>
    </div>)
}

export default UserComponent