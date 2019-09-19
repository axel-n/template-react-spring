const typewatch = function(){
    let timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    }
}();


export default typewatch;
