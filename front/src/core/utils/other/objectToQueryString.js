export default function(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== '' && obj[p] !== null) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
