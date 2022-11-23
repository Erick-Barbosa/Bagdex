const SearchList = (searchParams) => {
    var list = []

    function setBagmon(number) {
        searchParams.setBagmon(number)
        searchParams.resetSearch("")
        document.getElementById("search").value = ""
    }

    var searchText = searchParams.text
    if(searchParams.text == "")
        return  
    
    searchParams.list .forEach(element => {
        if((element.name.toLowerCase())
        .includes(searchText.toLowerCase()))
        list.push(
            <div 
                className="search_bar_list" 
                onClick={e => setBagmon(element.id-1)}>
                    {element.id} - {element.name}
            </div>
        )
    });
    
    
    return list
}

export default SearchList