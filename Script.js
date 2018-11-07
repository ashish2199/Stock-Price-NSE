function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function handler(responseText){
    var parser      = new DOMParser ();
    var responseDoc = parser.parseFromString (responseText, "text/html");
    var json_resp = responseDoc.getElementById('responseDiv');
    var data = json_resp.innerHTML.trim();
    var obj = JSON.parse(data);
    printStock(obj);
}
function printStock(obj){
    var stockData = obj.data[0];
    console.log(" Symbol = "+stockData.symbol+"\n Close Price = "+stockData.closePrice+"\n 52 Week High = "+stockData.high52+"\n 52 Week Low = "+stockData.low52);
        
    /*
    for (var key in stockData) {
       console.log(key+" : "+stockData[key]);
    }
    */
}

/*
Name of the stock
*/
var share_code="TCS";

var url ='https://allorigins.me/get?method=raw&url=https%3A//www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp%3Fsymbol%3D'+share_code+'&callback=?'

callAjax(url,handler);

