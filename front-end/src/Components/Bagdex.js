import './Bagdex.css';
import axios from 'axios'

//Left side
import ImageScreen from './ImageScreen';
import ButtonSession from './Buttons/ButtonSession';
import SessionLight from './SessionLight';
import ButtonBoard from './BagdexComponents/ButtonBoard';

//Right side
import InfoScreen from './InfoScreen';
import StatsNature from './StatsNature';
import BagmonList from './BagmonList';
import SearchBar from './SearchBar';

import BagmonMock from '../Mock/BagmonMock';
import NatureMock from '../Mock/NatureMock';

import { Component } from 'react';


let urlApiBagmon = 'http://localhost:5085/api/Bagdex'
const initialState = {
  bagmonList: [],
  currentBagmonIndex: 0,
  bagmonListToDisplay: [],
  natureList: NatureMock(),
  selectedNature: 0,
  statsList: []
}

export default class Bagdex extends Component {

  state = { ...initialState }
  list = []

  async componentDidMount() {
    var data = {}

    try {
      await axios(urlApiBagmon).then(resp => {
        data = resp.data
      })
    } catch {
      data = BagmonMock()
    }

    if(Object.keys(data).length)
      localStorage.setItem("bagmonListLength", Object.keys(data).length)
    
    this.setState({ bagmonList: data })
    this.updateListToDisplay(0, data)
    this.setStats(0, data)
  }

  setNextBagmon = () => {   
    var newPosition = 0 
    var currentBagmon = this.state.currentBagmonIndex

    if(currentBagmon < this.state.bagmonList.length - 1)
      newPosition = currentBagmon + 1
    
    this.setState({ currentBagmonIndex: newPosition })
    this.updateListToDisplay(newPosition, this.state.bagmonList)
    this.setStats(newPosition, this.state.bagmonList)
  }

  setPreviousBagmon = () => {
    var newPosition = 0
    var currentBagmon = this.state.currentBagmonIndex

    if(currentBagmon > 0)
      newPosition = currentBagmon - 1
    else 
      newPosition = this.state.bagmonList.length - 1
    
    this.setState({ currentBagmonIndex: newPosition })
    this.updateListToDisplay(newPosition, this.state.bagmonList)
    this.setStats(newPosition, this.state.bagmonList)
  }

  setCurrentBagmonIndex = (newPosition) => {
    this.setState({ currentBagmonIndex: newPosition })
    this.updateListToDisplay(newPosition, this.state.bagmonList)
    this.setStats(newPosition, this.state.bagmonList)
  }

  setNextNature = () => {
    var newPosition = 0 
    var currentNature = this.state.selectedNature
    
    if(currentNature < this.state.natureList.length - 1)
      newPosition = currentNature + 1

    this.setState({ selectedNature: newPosition })
    this.setStats(this.state.currentBagmonIndex, this.state.bagmonList, "+")
  }

  setPreviousNature = () => {
    var newPosition = 0
    var currentNature = this.state.selectedNature

    if(currentNature > 0)
      newPosition = currentNature - 1
    else 
      newPosition = this.state.natureList.length - 1

    this.setState({ selectedNature: newPosition })
    this.setStats(this.state.currentBagmonIndex, this.state.bagmonList, "-")
  }

  setStats = (index, list, signal) => {
    var bagmon = list[index]
    var currentNature = this.getSelectedNature(signal)

    var newStatsList = [
      bagmon.health_points,
      bagmon.attack,
      bagmon.special_attack,
      bagmon.defense,
      bagmon.special_defense,
      bagmon.speed,
    ]

    var nature = this.state.natureList[currentNature]
    if(nature.stats_down !== nature.stats_up){
      this.calcStatsWithNature(nature.stats_up, newStatsList, "+")
      this.calcStatsWithNature(nature.stats_down, newStatsList, "-")
    }

    this.setState({ statsList: newStatsList })
  }

  getSelectedNature(signal) {
    switch(signal) {
      case "+":
        if(this.state.selectedNature+1 < this.state.natureList.length - 1)
          return this.state.selectedNature + 1
        else
          return 0
      case "-":
        if(this.state.selectedNature-1 > 0)
          return this.state.selectedNature - 1
        else
          return this.state.natureList.length - 1
      default: return 0
    }
  }

  calcStatsWithNature(statsName, list, signal) {
    var statsToModify = 0

    switch(statsName){
      case "Attack": 
        statsToModify = 1
        break;
      case "Sp. Atk": 
        statsToModify = 2
        break;
      case "Defense": 
        statsToModify = 3
        break;
      case "Sp. Def": 
        statsToModify = 4
        break;
      case "Speed" : 
        statsToModify = 5
        break;
      default: statsToModify = 0
    }

    if(signal === "+"){
      list[statsToModify] = parseInt(list[statsToModify]) + list[statsToModify]/10}
    else if(signal === "-")
      list[statsToModify] = parseInt(list[statsToModify]) - list[statsToModify]/10
  }

  updateListToDisplay = (index, list) => {
    let actualIndex = index
    if(index === -1)
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
    
    this.setState({ bagmonListToDisplay: this.list })
  }

  render() {
    return (
      <div id="pokedex">
        <div>
          {this.state.time}
        </div>
        <div id="left" >
            <div id="bg_curve1_left"></div>
            <div id="bg_curve2_left"></div>
            <div id="curve1_left">
                <div id="buttonGlass">
                  <div id="reflect"> </div>
                </div>
                <SessionLight isLogged={this.props.isLogged}/>
            </div>
            <div id="curve2_left">
            <ButtonSession text={this.props.text}/>
            </div>
            <ImageScreen {...this.state.bagmonList[this.state.currentBagmonIndex]}/>
            <ButtonBoard
              isLogged={this.props.isLogged}
              nextBagmon={this.setNextBagmon}
              previousBagmon={this.setPreviousBagmon}
              nextNature={this.setNextNature}
              previousNature={this.setPreviousNature}
            />
        </div>
        <div id="right">
            <InfoScreen {...this.state.bagmonList[this.state.currentBagmonIndex]}/>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right">
            <BagmonList 
              list={this.state.bagmonListToDisplay}
            />
            <StatsNature 
              stats={this.state.statsList}
              nature={this.state.natureList[this.state.selectedNature]}
            />
            </div>
            <SearchBar 
              list={this.state.bagmonList} 
              set={this.setCurrentBagmonIndex}
            />
            <div id="curve2_right"></div>
        </div>
      </div>
    )
  };
}