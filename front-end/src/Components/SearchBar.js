import { useState } from 'react'
import './SearchBar.css'
import SearchList from './SearchList'

const SearchBar = (searchParams) => {

    const [searchValue, setSearchValue] = useState("")
    return (
        <div onMouseLeave={e => setSearchValue("")}>
            <form onSubmit={e => e.preventDefault()}>
                <input 
                    id='search'
                    className='search_bar'
                    type="text"
                    placeholder="🔍 Pesquisar..."
                    autoComplete='off'
                    onChange={({ target }) => {
                        setSearchValue(target.value)
                    }}                    
                    onMouseEnter={({ target }) => {
                        setSearchValue(target.value)
                    }}
                    
                ></input>
            </form>
            <SearchList 
                text={searchValue}
                list={searchParams.list} 
                setBagmon={searchParams.set}
                resetSearch={setSearchValue}
                className="search_bar_list"/>
        </div>
    )
}

export default SearchBar