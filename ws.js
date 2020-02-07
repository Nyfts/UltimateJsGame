var JSONRequest;

const requestGET = async () => {
  const response = await fetch('http://localhost:5000/api/score');
  JSONRequest = await response.json();
  createTable(JSONRequest);
}

const requestPOST = async (name, value) => {
  const response = await fetch('http://localhost:5000/api/score', {
    method: 'POST',
    body: '{"name":"'+name+'","value":'+value+'}', // string or object
    headers: {
      'Content-Type': 'application/json'
    }
  });
  JSONRequest = await response.json(); //extract JSON from the http response
  // do something with myJson
}


function createTable(jsonObj) {
  var DOMtable = "<table><tr><td><b>Position</b></td><td><b>Name</b></td><td><b>Score</b></td></tr>"
  console.log(jsonObj);
  for (i = 0; i < jsonObj.length; i++) {
    DOMtable += "<tr>";
    DOMtable += "<td>"+(i+1)+"</td><td>"+jsonObj[i].name+"</td><td>"+jsonObj[i].value+"</td></tr>";
  }
  DOMtable += "</table><button style='margin-bottom: 0px;' onclick='closeScoreboard()'>Close</button>";
  console.log(DOMtable);
  document.getElementById("Scoreboard").innerHTML = DOMtable;
}