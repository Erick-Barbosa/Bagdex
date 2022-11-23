import { Component } from 'react'
import './BagmonList.css'

export default class BagmonList extends Component {

    render() {
        if(this.props.list[0] != undefined){
        return (
            <div id="list">
                {this.props.list.map((value) => 
                    <div className='element'>{value}</div>
                )}
            </div>
        )}
        else
        return(
            <div id='list'>
                <div className='element'> Carregando Lista...</div>
            </div>
        )
    }
}