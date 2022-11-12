import InfoScreen from './InfoScreen';
import StatsNature from './StatsNature';
import BagmonList from './BagmonList';

export default function(props) {
    return(
        <div id="right">
            <InfoScreen {...props}/>
            <div id="bg_curve1_right"></div>
            <div id="bg_curve2_right"></div>
            <div id="curve1_right">
            <BagmonList {...props}/>
            <StatsNature {...props}/>
            </div>
            <div id="curve2_right"></div>
        </div>
    )
}