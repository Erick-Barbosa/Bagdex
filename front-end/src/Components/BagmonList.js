import { Component } from 'react'
import './BagmonList.css'

let listToDisplay = Array()

export default class BagmonList extends Component {
    
    componentDidUpdate() {
        //console.log("update")
    }

    teste1() {
        console.log("teste1")
        console.log(this.props.bagmonList)
    }

    teste2() {
        console.log("teste2")
        console.log(listToDisplay)
    }

    componentDidMount() {
        listToDisplay.push(this.props.bagmonList[0])
    }

    render() {
    return (
        <div id="list">
            <ul></ul>
                <div className='firstElement'>1 -  Voara</div>
                <div className='element'>2 - Azurara</div>
                <div className='element'>3 - Ararazul</div>
                <div className='element'>4 - Pequemico</div>
                <div className='element'>5 - Micorado</div>
                <div className='element'>6 - Douraleão</div>
        </div>
    )}
}