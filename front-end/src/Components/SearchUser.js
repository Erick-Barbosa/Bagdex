import { useState } from 'react'
import './SearchUser.css'
import SearchUserList from './SearchUserList'

const SearchUser = (searchParams) => {

    const [searchValue, setSearchValue] = useState("")
    return (
        <div>
            <form onSubmit={e => e.preventDefault()}>
                <input 
                    id='search_user'
                    className='search_user'
                    type="text"
                    placeholder="🔍 Pesquisar..."
                    autoComplete='off'
                    onChange={({ target }) => {
                        setSearchValue(target.value)
                    }}
                    
                ></input>
            </form>
            <SearchUserList 
                text={searchValue}
                list={searchParams.list}
                showButtons={searchParams.showButtons}
                hideButtons={searchParams.hideButtons}/>
        </div>
    )
}

export default SearchUser