import './App.css';
import axios from 'axios'

//Left side
import ButtonBoard from './Components/ButtonBoard';
import ImageScreen from './Components/ImageScreen';

//Right side
import InfoScreen from './Components/InfoScreen';
import StatsNature from './Components/StatsNature';
import BagmonList from './Components/BagmonList';

import BagmonMock from './Mock/BagmonMock';

import { Component } from 'react';

let urlApiBagmon = 'http://localhost:5085/api/Bagdex'
const initialState = {
  bagmonList: [],
  selectedBagmon: 0,
  listToDisplay: []
}

export default class App extends Component {

  state = { ...initialState }
  list = []

  componentDidMount() {
    var data = []

    axios(urlApiBagmon).then(resp => {
      data = resp.data
    }
    ).catch(
      data = BagmonMock()
    )
    
    this.setState({ bagmonList: data })
    this.updateListToDisplay(0, data)
  }

  setNextBagmon = () => {    
    if(this.state.selectedBagmon < this.state.bagmonList.length - 1){
      this.setState({ selectedBagmon: this.state.selectedBagmon + 1 })
      this.updateListToDisplay(this.state.selectedBagmon + 1, this.state.bagmonList)
    }
    else {
      this.setState({ selectedBagmon: 0 })
      this.updateListToDisplay(0, this.state.bagmonList)
    }
  }

  setPreviousBagmon = () => {
    if(this.state.selectedBagmon > 0){
      this.setState({ selectedBagmon: this.state.selectedBagmon - 1 })
      this.updateListToDisplay(this.state.selectedBagmon - 1, this.state.bagmonList)
    }
    else {
      this.setState({ selectedBagmon: this.state.bagmonList.length - 1 })
      this.updateListToDisplay(this.state.bagmonList.length - 1, this.state.bagmonList)
    }
  }

  updateListToDisplay = (index, list) => {
    let actualIndex = index
    if(index == -1)
      actualIndex = list.length - 1
    if(index > list.length)
      actualIndex = 0
    let lastIndex = actualIndex + 6
    this.list = []

    for( actualIndex; actualIndex < lastIndex; actualIndex++) {
      if(list[actualIndex]){
      this.list.push(
        list[actualIndex].id +
        " - " + 
        list[actualIndex].name
      )} else this.list.push(" - ")
    }
    
    this.setState({ listToDisplay: this.list })
  }

  render() {
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
              startList={this.startList}
              bagmonList={this.state.listToDisplay}
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
