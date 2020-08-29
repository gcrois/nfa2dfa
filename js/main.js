// global variables
let nodes     = -1;
let edges     = -1;
let container = -1;
let data      = -1;
let options   = -1;
let network   = -1;
let output    = -1;

// perform necessary tasks upon page load
function init() {
  // assign important variables
  output = document.getElementById("output");

  // set GUI to default state
  output.value = "";

  // Test state
  test = [new State(0, "Hewwo", [], false)];
  // create an array with nodes
  nodes = new vis.DataSet([
      test[0]
  ]);

  // create an array with edges
  edges = new vis.DataSet([
    test[0].transitions["e"],
//      {id: 0, arrows: "to", label: "test", from: 1, to: 3},
//      {from: 1, to: 2},
//      {from: 2, to: 4},
//      {from: 2, to: 5}
  ]);

  // create a network
  container = document.getElementById("graph");

  console.log(container);

  // provide the data in the vis format
  data = {
      nodes: nodes,
      edges: edges
  };
  options = {};

  // initialize your network!
  network = new vis.Network(container, data, options);
}

function update() {
  data.nodes.update([{id:0, label:"hi"}]);
  console.log(test);
  output.value = JSON.stringify(test) + ":)";
}
