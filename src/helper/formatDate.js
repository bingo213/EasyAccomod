export default function formatDate(date){
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}