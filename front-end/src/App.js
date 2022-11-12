import './App.css';
import axios from 'axios'

//Left side
import ButtonBoard from './Components/ButtonBoard';
import ImageScreen from './Components/ImageScreen';

//Right side
import InfoScreen from './Components/InfoScreen';
import StatsNature from './Components/StatsNature';
import BagmonList from './Components/BagmonList';

import { Component } from 'react';

let urlApiBagmon = 'http://localhost:5085/api/Bagdex'
const initialState = {
  bagmonList: [],
  selectedBagmon: 0,
  unknownBagmon: [
    { 
      id: '', name: 'Desconhecido', type1: '?', type2: '?', type3: '?', ability: '?',
      weakness: '?', description: '', image: '', health_points: '', attack: '', defense: '',
      special_defense: '', special_attack: '', speed: '', min_height: '?', max_height: '?',
      min_weight: '?', max_weight: '?'
    }
  ]
}

var actualBagmon = initialState.unknownBagmon

export default class App extends Component {

  state = { ...initialState }

  componentDidMount() {
    axios(urlApiBagmon).then(resp => {
      this.setState({ bagmonList: resp.data})
    }).catch(
      this.setState({ bagmonList: this.state.unknownBagmon})
    )
  }

  setNextBagmon = () => {
      this.setState({selectedBagmon: this.state.selectedBagmon+1})
  }

  setPreviousBagmon = () => {
    this.setState({selectedBagmon: this.state.selectedBagmon-1})
  }

  render() {
      actualBagmon = this.state.un

      return (
      <div id="pokedex">
        <div id="left" >
            <div id="logo"></div>
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
                <div id="buttonGlass">
                <div id="reflect"> </div>
                </div>
                <div id="miniButtonGlass3"></div>
            </div>
            <div id="curve2_left">
            </div>
            <ImageScreen {...this.state.bagmonList[this.state.selectedBagmon]} ></ImageScreen>
            <ButtonBoard 
              nextBagmon={this.setNextBagmon}
              previousBagmon={this.setPreviousBagmon}
            />
        </div>
        <div id="right">
            <InfoScreen {...this.state.bagmonList[this.state.selectedBagmon]}/>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right">
            <BagmonList 
              bagmonList={this.state.bagmonList}
              bagmonIndex={this.state.selectedBagmon}
            />
            <StatsNature {...this.state.bagmonList[this.state.selectedBagmon]}/>
            </div>
            <div id="curve2_right"></div>
        </div>
      </div>
      )
  };
}
