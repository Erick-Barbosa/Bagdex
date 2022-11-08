import './ButtonBoard.css'

export default function ButtonBoard() {
    return(
        <div className="board">
            <div className="button_group">
                <div id="button_right"></div>
                <div id="button_left"></div>
                <div id="button_top"></div>
                <div id="button_bottom"></div>
            </div>

            <div id="cross">
                <div id="leftcross">
                <div id="leftT"></div>
                </div>
                <div id="topcross">
                <div id="upT"></div>
                </div>
                <div id="rightcross">
                <div id="rightT"></div>
                </div>
                <div id="midcross">
                <div id="midCircle"></div>
                </div>
                <div id="botcross">
                <div id="downT"></div>
                </div>
            </div>
        </div>
    )
}