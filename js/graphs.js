// A directed edge between two nodes
class Edge {
  constructor(id, symbol, from, to, dataset, color = "green", arrow_type = {to: {enabled: true}}){
    // fancy e
    if (symbol == "e") symbol = "ε";

    // to access graphical representation
    this.dataset   = dataset;
    this.id        = id;

    // points to Node objects
    this.from_obj  = from;
    this.to_obj    = to;

    // just id's (necessary for graphics)
    this.from      = from.id;
    this.to        = to.id;

    // graphical settings
    this.label     = symbol;
    this.arrows    = arrow_type;
    this.color     = color;

    // add to dataset and nodes
    dataset.update(this);
    this.from_obj.add_edge("output", this);
    this.to_obj.add_edge("input", this);
  }

  // update or add some property
  update(property, value, add_mode = false){
    // check to make sure not forbidden
    if (property == "id") {
      console.log("Error -- changing " + property + " is forbidden.");
      return -1;
    }
    // check for existence
    if (!(property in this) && !add_mode) {
      console.log("Error -- " + property + " not found in Edge object.");
      return -1;
    }
    // make update
    this[property] = value;
    this.dataset.update(this);
  }

  // destructor
  delete() {
    // remove self from origin and destination
    delete this.to_obj.input[this.id];
    delete this.from_obj.output[this.id];
    // delete self from graphics
    this.dataset.remove(this.id);
    // return so graph can delete their copy
    return this.id;
  }
}

// A labeled point which can be connected to other points
class Node {
  constructor(id, label, dataset, color = "blue", initial = false, final = false, x = 0, y = 0) {
    // create unique identifier and add label
    this.id = id;
    this.label = label;

    // input and output edges
    this.input  = {};
    this.output = {};

    // graphical container and properties
    this.dataset = dataset;
    this.color = color;
    this.x = x;
    this.y = y;

    dataset.update(this);
  }

  // adds an edge
  add_edge(mode, edge) {
    // make sure we have valid input
    if (mode != "input" && mode != "output") {
      console.print("Improper add mode for " + this.id);
    }
    // if key doesn't exist yet, initialize with empty list
    if (!(edge.label in this[mode])) {
      this[mode][edge.label] = [];
    }
    // add edge
    this[mode][edge.label].push(edge);
  }

  // update or add some property of the node
  update(property, value, add_mode = false){
    // check to make not sure forbidden
    if (property == "id") {
      console.log("Error -- changing " + property + " is forbidden.");
      return -1;
    }
    // check for existence
    if (!(property in this) && !add_mode) {
      console.log("Error -- " + property + " not found in Edge object.");
      return -1;
    }
    // make update
    this[property] = value;
    dataset.update(this);
  }

  // destructor
  delete() {
    let deleted_edges = [];

    // delete all edges associated with node
    for (const i in this.output) {
      for (const j in this.output[i]){
        deleted_edges.push(this.output[i][j].delete());
      }
    }
    for (const i in this.input) {
      for (const j in this.input[i]){
        deleted_edges.push(this.input[i][j].delete());
      }
    }

    // delete self from graphics
    this.dataset.remove(this.id);

    // return deleted edges so graph can delete them
    return deleted_edges;
  }
}

// Container for nodes and edges
class Graph {
  constructor(container, json, options={}, def_color="#bafff6", tar_color="red", sec_color="orange", tri_color="yellow") {
    // sets for computation
    this.edges     = {};
    this.nodes     = {};
    this.alphabet  = new Set();
    this.n_edges   = 0;

    // visual sets
    this.v_edges   = new vis.DataSet([]);
    this.v_nodes   = new vis.DataSet([]);

    // graphical representation
    this.network   = new vis.Network(container, {"edges": this.v_edges, "nodes": this.v_nodes}, options);
    this.json      = json;

    // visual settings
    this.def_color = def_color;
    this.tar_color = tar_color;
    this.sec_color = sec_color;
    this.tri_color = tri_color;
  }

  // creates new node
  new_node(label, color = this.def_color, initial = false, final = false, x = 0, y = 0) {
    // generate id
    let id = label.replace(/\s+/g, '');

    // check id for uniqueness and validity
    if (id in this.nodes) {
      console.log("Error - " + id + " already exists!");
      console.log(this.nodes);
      this.network.moveTo(this.v_nodes.get(id));
      return -1;
    } else if (id == "" || id == null) {
      console.log("Error - label \"" + id + "\" is invalid!");
      return -1;
    }

    // create node
    this.nodes[id] = new Node(id, label, this.v_nodes, color, initial, final, x, y);

    // update json
    this.export();
  }

  // creates new edge
  new_edge(symbol, from, to, color = this.def_color) {
    // remove whitespace from symbol and find nodes
    symbol = symbol.replace(/\s+/g, '');
    let from_obj = this.nodes[from];
    let to_obj = this.nodes[to];

    // verify that objects exist
    if ((from_obj == undefined) || (to_obj == undefined)) {
      console.log("Error - invalid node selection for edge gen!");
      console.log(to, from);
      return -1;
    }

    // add new symbol to alphabet
    this.alphabet.add(symbol);

    // add to dict of edges
    this.edges[this.n_edges] = new Edge(this.n_edges, symbol, from_obj, to_obj, this.v_edges, color = this.def_color);
    this.n_edges++;

    // update json
    this.export();
  }

  // deletes node
  del_node(label) {
    // find node from label
    let id = label.replace(/\s+/g, '');
    let node = this.nodes[label];

    // ensure it exists
    if (node == undefined) {
      console.log("Error - node \"" + id + "\" DNE!");
      return -1;
    }

    // delete it
    let deleted_edges = node.delete();
    delete this.nodes[label];

    // delete edges
    for (const i in deleted_edges) delete this.edges[deleted_edges[i]];

    // update json
    this.export();
  }

  // deletes edge
  del_edge(edge_id) {
    // find edge from id
    let edge = this.edges[edge_id];

    // ensure it exists
    if (edge == undefined) {
      console.log("Error - edge \"" + edge_id + "\" DNE!");
      return -1;
    }

    // delete it
    edge.delete();
    delete this.edges[edge_id];

    // update json
    this.export();
  }

  // imports graph state from string
  import() {
    content = JSON.parse(this.json.value);

    console.log(content);

    // add nodes
    for (const i in content.nodes) {
      this.new_node(content.nodes[i]);
    }

    /*
    // create initial values for the entire alphabet
    this.alphabet.forEach(function(symbol) {
      output["edges"][symbol] = [];
    });

    // add edge to output
    for (const i in this.edges) {
      let tmp = {
        "from": this.edges[i].from_obj.id,
        "to": this.edges[i].to_obj.id
      }
      output["edges"][this.edges[i].label].push(tmp);
    }

    return "TODO";*/
  }

  // exports graph state as string
  export() {
    output = {
      "nodes": [],
      "edges": {},
    };

    // add node to output
    for (const i in this.nodes) {
      output["nodes"].push(i);
    }

    // create initial values for the entire alphabet
    this.alphabet.forEach(function(symbol) {
      output["edges"][symbol] = [];
    });

    // add edge to output
    for (const i in this.edges) {
      let tmp = {
        "from": this.edges[i].from_obj.id,
        "to": this.edges[i].to_obj.id
      }
      output["edges"][this.edges[i].label].push(tmp);
    }

    this.json.value = JSON.stringify(output, undefined, 4);
  }

  // delete everything
  delete() {
    // kill the nodes!
    for (const i in this.nodes) {
      this.del_node(this.nodes[i].label);
    }
    // erase the alphabet!
    this.alphabet = new Set();
  }
}


// TESTING CODE
function init() {
  let container = document.getElementById("input_graph");
  let output = document.getElementById("output");
  let input = document.getElementById("input");

  graph = new Graph(container, input);

  graph.new_node("hewwo");
  graph.new_node("pee");
  graph.new_edge("g", "hewwo", "pee");
  graph.new_edge("g", "hewwo", "pee");
  graph.new_edge("g", "pee", "pee");
  graph.new_edge("g", "pee", "hewwo");
  graph.new_edge("h", "hewwo", "pee");

  graph.export();

  function test() {
    graph.import()
  }

  document.getElementById("in_update").addEventListener("click", test);
}
