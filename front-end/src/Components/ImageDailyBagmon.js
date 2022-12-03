import './ImageDailyBagmon.css';

export default function ImageDailyBagmon(props) {
  
    let imageUrl = (props.image) ?
    `https://docs.google.com/uc?id=${props.image}` :
    "https://cdn-icons-png.flaticon.com/512/63/63985.png"
    
    return (
    <div id="screen_daily">
        <div id="picture">
          <img src={imageUrl} alt="Bágmon" height="200"/>
        </div>
      </div>
    )
}