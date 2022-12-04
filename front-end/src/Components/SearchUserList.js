import UserComponent from "./UserComponent"

const SearchUserList = (searchParams) => {
    var list = []

    var searchText = searchParams.text
    if(searchParams.text == "")
        return  
    
    searchParams.list.forEach(element => {
        if((element.username.toLowerCase())
        .includes(searchText.toLowerCase())){
            if(list.length > 3)
                return
            list.push(
                <div className="search_user_list">
                    <UserComponent
                        user={element}
                        hideButtons={searchParams.hideButtons}
                        showButtons={searchParams.showButtons}
                    />
                </div>
            )
        }
    });
    
    return list
}

export default SearchUserList