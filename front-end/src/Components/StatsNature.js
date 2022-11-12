import './StatsNature.css'

export default function StatsNature(props) {

    return (
        <div>
            <div id="stats_nature"></div>
            <table id="stats_values">
                <tbody>
                <tr>
                    <td><strong>Atk</strong> {props.attack} </td>
                    <td className="right_stats"><strong>Sp. Atk</strong> {props.special_attack} </td>
                </tr>
                <tr>
                    <td><strong>Def</strong> {props.defense} </td>
                    <td className="right_stats"><strong>Sp. Def</strong> {props.special_defense} </td>
                </tr>
                <tr>
                    <td><strong>Hp</strong> {props.health_points} </td>
                    <td className="right_stats"><strong>Speed</strong> {props.speed} </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}