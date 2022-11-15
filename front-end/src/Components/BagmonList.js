import { Component } from 'react'
import './BagmonList.css'

export default class BagmonList extends Component {

    listToDisplay = []

    render() {
        return (
            <div id="list">
                <div className='firstElement'>{this.props[0]}</div>
                <div className='element'>{this.props[1]}</div>
                <div className='element'>{this.props[2]}</div>
                <div className='element'>{this.props[3]}</div>
                <div className='element'>{this.props[4]}</div>
                <div className='element'>{this.props[5]}</div>
            </div>
        )
    }
}