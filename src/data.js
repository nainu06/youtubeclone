export const API_KEY = 'AIzaSyB-B0aT3Zby-k5_ywMc40xZP_XobnCpGXQ'

export const valueConverter = (value)=> {
    if(value>=1000000){
        return Math.floor(value/1000000) + 'M'
    } else if(value>=1000){
        return Math.floor(value/1000) + 'M'
    } else{
        return value;
    }
}