// global variables
let nodes     = -1;
let edges     = -1;
let container = -1;
let data      = -1;
let options   = -1;
let network   = -1;
let output    = -1;
let input     = -1;
let states    = -1;

// perform necessary tasks upon page load
function init() {
  // initialize important variables
  output = document.getElementById("output");
  output = document.getElementById("input");

  // special formats for network vis
  options = {};
  edges = new vis.DataSet([]);
  nodes = new vis.DataSet([]);

  // create the network
  container = document.getElementById("graph");
  network = new vis.Network(container, data, options);

  // set GUI to default state
  output.value = "";

  // Test state
  states = [new State(0, "Hewwo", [], false)];
  // create an array with nodes
  /*nodes = new vis.DataSet([
      test[0]
  ]);

  // create an array with edges
  edges = new vis.DataSet([
    test[0].transitions["e"],
  //      {id: 0, arrows: "to", label: "test", from: 1, to: 3},
  //      {from: 1, to: 2},
  //      {from: 2, to: 4},
  //      {from: 2, to: 5}
  ]);*/
  console.log(container);
}

function update() {
  data.nodes.update([{id:0, label:"hi"}]);
  output.value = JSON.stringify(test) + ":)";
}

function parse() {
  output.value = JSON.parse(input.value);
}
