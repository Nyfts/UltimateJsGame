var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    callback(xmlHttp.responseText);
  }
  
  xmlHttp.open("GET", "http://localhost:5000/api/score", true); // true for asynchronous 
  xmlHttp.send(null);
}

function createTable() {
  // request = JSON.parse(JSONRequest)
  var DOMtable = "<table><tr><td>Name</td><td>Score</td></tr>"
  for (i = 0; i < request.length; i++) {
    DOMtable += "<tr>";
    DOMtable += "<td>"+request[i].name+"</td><td>"+request[1].value+"</td></tr>";
  }
  DOMtable += "</table>";
  document.getElementById("body").innerHTML = DOMtable;
}