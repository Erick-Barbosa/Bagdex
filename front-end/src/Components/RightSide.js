import InfoScreen from './InfoScreen';
import StatsNature from './StatsNature';
import BagmonList from './BagmonList';

export default function() {
    return(
        <div id="right">
            <InfoScreen/>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right">
            <BagmonList/>
            <StatsNature/>
            </div>
            <div id="curve2_right"></div>
        </div>
    )
}