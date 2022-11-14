import { Component } from 'react'
import './BagmonList.css'

export default class BagmonList extends Component {

    listToDisplay = []

    render() {
        return (
            <div id="list">
                <div className='firstElement'>{this.props.bagmonList[0]}</div>
                <div className='element'>{this.props.bagmonList[1]}</div>
                <div className='element'>{this.props.bagmonList[2]}</div>
                <div className='element'>{this.props.bagmonList[3]}</div>
                <div className='element'>{this.props.bagmonList[4]}</div>
                <div className='element'>{this.props.bagmonList[5]}</div>
            </div>
        )
    }
}