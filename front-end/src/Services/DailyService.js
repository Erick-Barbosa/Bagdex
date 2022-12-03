import axios from "axios";

const urlApiBagmon = "http://localhost:5085/api/Bagdex/bagmon?id="
var bagmon = ["", ""]

async function setDailyBagmon () {
    var usedBagmon = JSON.parse(localStorage.getItem("usedBagmon"))    
    var listLength = localStorage.getItem("bagmonListLength")

    var randomBagmonId = Math.floor(Math.random() * listLength)

    if(Array.isArray(usedBagmon)) {
        if(usedBagmon.includes(randomBagmonId)){
            usedBagmon.push(randomBagmonId)
        }
    }
    else if(usedBagmon != randomBagmonId){
        usedBagmon = randomBagmonId
    }
    
    if(randomBagmonId == 0)
        randomBagmonId = 1

    await fetchBagmon(randomBagmonId)
    localStorage.setItem("dailyBagmonDescription", bagmon[0])
    localStorage.setItem("dailyBagmonImage", bagmon[1])
    
    localStorage.setItem("usedBagmon", JSON.parse(usedBagmon))

    if(usedBagmon.length >= listLength){
        localStorage.setItem("usedBagmon", [])
    }
};

async function fetchBagmon(index) {
    await axios(urlApiBagmon+index).then(resp => {
        bagmon = [resp.data.description, resp.data.image]
    })
    return 
}

const DailyService = {
    setDailyBagmon
};
    
export default DailyService;