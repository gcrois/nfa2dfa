// global variables
let nodes     = -1;
let edges     = -1;
let container = -1;
let data      = -1;
let options   = -1;
let output    = -1;
let input     = -1;
let states    = -1;
let network   = -1;
const verbose =  0;
let menu      = -1;
let node_menu = false;

const n_menu_html =  `
<div id="m_head_container"></div>
<button onclick=\"close_menu()\" id=\"close\">✖</button>
<div class="m_head">New node menu</div><br>
New label:
<input type="text" id="new_label" placeholder="label"><br><br>
Final state? <input type="checkbox" id="final">
`

// perform necessary tasks upon page load
function init() {
  // initialize important variables
  output = document.getElementById("output");
  input = document.getElementById("input");
  menu = document.getElementById("menu_pop");
  container = document.getElementById("graph");

  // special formats for network vis
  options = {};
  edges = new vis.DataSet([]);
  nodes = new vis.DataSet([]);

  // create the network
  network = new vis.Network(container, {"edges": edges, "nodes": nodes}, options);

  // set GUI to default state
  output.value = "";

  // States
  states = [];

  // Add initial state
  new_node("Init", "Init");

  // listen for event
  document.getElementById("graph").addEventListener("hold", close_menu);
  document.getElementById("graph").addEventListener("click", on_click);
}

function parse() {
  output.value = JSON.parse(input.value);
}

function on_click(context) {
  let id, e_id;
  if ((id = network.getNodeAt(context)) == undefined) {
    if ((e_id = network.getEdgeAt(context)) == undefined) {
      new_node_menu(context.clientX, context.clientY);
    }
  }
  else {
    close_menu();
  }
}

function new_node_menu(x, y) {
  node_menu = true;
  menu.innerHTML = n_menu_html;
  if (verbose) menu.innerHTML += "x: " + x + " y: " + y;
  menu.style["margin-left"] = x;
  menu.style["margin-top"]  = y;
  menu.style["display"]     = "block";
  if (verbose) console.log("New node menu @ " + x + ", " + y);

  let field = document.getElementById("new_label");
}

function close_menu(){
  menu.style["display"]     = "none";
}
