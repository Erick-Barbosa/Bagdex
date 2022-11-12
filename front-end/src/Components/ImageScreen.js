import './ImageScreen.css';

export default function ImageScreen(props) {
  
    let imageUrl = (props.image) ?
    `https://docs.google.com/uc?id=${props.image}` :
    "https://cdn-icons-png.flaticon.com/512/63/63985.png"
    
    let imageNumber = (props.id > 0) ? "#"+props.id : ""
    
    return (
    <div id="screen">
        <div id="picture">
          <img src={imageUrl} alt="Bágmon" height="200"/>
          <div className="bottom-right"><strong>{imageNumber}</strong></div>
        </div>
      </div>
    )
}