import { Component } from 'react'
import './InfoScreen.css'

export default class InfoScreen extends Component {

  render() {
    return (
      <div className="info">
        <strong>Nome</strong> {this.props.name} <br/>
        <strong>Tipo</strong> {this.props.type1} {this.props.type2} {this.props.type3}<br/>
        <strong>Habilidade</strong> {this.props.ability}<br/><br/>
        
        <strong>Fraquezas</strong> {this.props.weakness}<br/><br/>

        <strong>Altura</strong> {this.props.min_height} - {this.props.max_height} m<br/>
        <strong>Peso</strong> {this.props.min_weight} - {this.props.max_weight} Kg <br/>
      </div>
    )
  }
}