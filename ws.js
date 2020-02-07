var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    callback(xmlHttp.responseText);
  }
  
  xmlHttp.open("GET", "http://localhost:5000/api/score", true); // true for asynchronous 
  xmlHttp.send(null);
}