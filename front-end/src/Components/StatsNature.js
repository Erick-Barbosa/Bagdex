import './StatsNature.css'

export default function StatsNature() {
    return (
        <div>
            <div id="stats_nature"></div>
            <table id="stats_values">
                <tbody>
                <tr>
                    <td><strong>Atk</strong> 100</td>
                    <td className="right_stats"><strong>Sp. Atk</strong> 100</td>
                </tr>
                <tr>
                    <td><strong>Def</strong> 100</td>
                    <td className="right_stats"><strong>Sp. Def</strong> 100</td>
                </tr>
                <tr>
                    <td><strong>Hp</strong> 100</td>
                    <td className="right_stats"><strong>Speed</strong> 100</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}