import './ImageScreen.css';
import logo from './001.jpg'

export default function ImageScreen(props) {
    let imageUrl = `https://docs.google.com/uc?id=${props.id}`
    return (
    <div id="screen">
        <div id="picture">
          <img src={logo} alt="Bágmon" height="200"/>
          <div className="bottom-right"><strong>#33</strong></div>
        </div>
      </div>
    )
}