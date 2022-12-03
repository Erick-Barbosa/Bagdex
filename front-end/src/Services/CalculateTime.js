import DailyService from "./DailyService";

export default function calculateTime() {
    const actualDate = new Date()

    function getMinutesDiff(startDate, endDate) {
        const msInMinutes = 1000;
        
        return Math.round(Math.abs(endDate - startDate) / msInMinutes);
    }

    function unformatDate(date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        )
    }

    function getTimeRemaining() {
        
        var storagedDate = localStorage.getItem("date")
        
        if(localStorage.getItem("date") == null){   
            localStorage.setItem("date", unformatDate(actualDate))
        }

        var secondsRemaining = 86400 - getMinutesDiff(
            new Date(storagedDate),
            actualDate
        )

        if(secondsRemaining > 0 && secondsRemaining < 86400){
            secondsRemaining = secondsRemaining
        }
        else {
            DailyService.setDailyBagmon()
            localStorage.setItem("date", unformatDate(actualDate))
            secondsRemaining = -3
            window.location.reload(false)
        }

        var remainingHour = Math.floor(secondsRemaining / 60 / 60)
        var remainingMinute = Math.floor(secondsRemaining / 60 % 60)
        var hourString = remainingHour + " hora"
        var minuteString = remainingMinute + " minuto"

        if(remainingHour == 0)
            hourString = ""
        else if(remainingHour > 1)
            hourString += "s"

        if(remainingMinute == 0)
            minuteString = ""
        else if(remainingMinute > 1)
            minuteString += "s"
        
        if(remainingHour && remainingMinute > 0)
            hourString += " e "

        if(isNaN(remainingHour) && isNaN(remainingMinute)){
            hourString = "?"
            minuteString = ""
        }
        var timeString = hourString + minuteString

        return timeString
    }

    return (getTimeRemaining())
}