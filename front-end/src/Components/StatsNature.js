import { Component } from 'react'
import './StatsNature.css'

export default class StatsNature extends Component {
    render() {
    return (
        <div>
            <div id="stats_nature">O Bagmon {this.props.nature.name} tem as características de:
                <div className='stats_up'><strong>- {this.props.nature.stats_down}</strong></div>
                <div className='stats_down'><strong>+ {this.props.nature.stats_up}</strong></div>
            </div>
            <table id="stats_values">
                <tbody>
                <tr>
                    <td><strong>Hp</strong> {this.props.stats[0]} </td>
                    <td className="right_stats"><strong>Attack</strong> {this.props.stats[1]} </td>
                </tr>
                <tr>
                    <td><strong>Sp. Atk</strong> {this.props.stats[2]} </td>
                    <td className="right_stats"><strong>Defense</strong> {this.props.stats[3]} </td>
                </tr>
                <tr>
                    <td><strong>Sp. Def</strong> {this.props.stats[4]} </td>
                    <td className="right_stats"><strong>Speed</strong> {this.props.stats[5]} </td>
                </tr>
                </tbody>
            </table>
        </div>
    )}
}