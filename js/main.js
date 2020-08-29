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
let node_name = "";


const new_node_menu_html =  `
<div id="m_head_container"></div>
<button onclick=\"close_menu()\" id=\"close\">✖</button>
<div class="m_head">New node menu</div><br>
New label:
<input type="text" id="new_label" placeholder="Label"><br><br>
Final state? <input type="checkbox" id="final"><br><br>
<button onclick="node_from_menu()" style="width: 100%;">Create node</button>
`;

const node_menu_html_top =  `
<div id="m_head_container"></div>
<button onclick=\"close_menu()\" id=\"close\">✖</button>
<div class="m_head">Edit node menu</div><br><center style="margin-top: -10px;">Node: `;

const node_menu_html_bottom =  `
</center>
Add transition:
<input type="text" id="to" placeholder="To" style="width: 49%;"><input type="text" id="symbol" placeholder="Symbol" style="width: 49%;"><br>
<button onclick="add_edge()" style="width: 100%;">Add edge</button>

Change label:
<input type="text" id="new_label" placeholder="Label"><br>
<button onclick="node_from_menu()" style="width: 100%;">Change label</button>

<button onclick="node_from_menu()" style="width: 100%;">Toggle final</button>

<button onclick="node_from_menu()" style="width: 100%;">Delete node</button>
`;

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
  states = {};

  // Add initial state
  new_node("Init", false);

  // listen for event
  document.getElementById("graph").addEventListener("click", on_click);
  document.getElementById("edit_mode").addEventListener("click", close_menu);
}

// TODO: Will parse input
function parse() {
  output.value = JSON.parse(input.value);
}

// When you click on the graph window,
function on_click(context) {
  let id, e_id;

  // check if you're on an object
  if ((id = network.getNodeAt(context)) == undefined) {
    // if not on Node, check edge
    if ((e_id = network.getEdgeAt(context)) == undefined) {
      // now, let's try to make a new node
      close_menu();
      new_node_menu(context.clientX, context.clientY);
    }
    else {
      close_menu();
      alert("Edge editor");
    }
  }
  else {
    // open the edit menu
    close_menu();
    node_name = id;
    node_edit_menu(context.clientX, context.clientY);
  }
}

// set display to show new node menu
function new_node_menu(x, y) {
  if (document.getElementById("edit_mode").checked) {
    clicked_x = x;
    clicked_y = y;

    menu.innerHTML = new_node_menu_html;
    if (verbose) menu.innerHTML += "x: " + x + " y: " + y;
    menu.style["margin-left"] = x;
    menu.style["margin-top"]  = y;
    menu.style["display"]     = "block";
    if (verbose) console.log("New node menu @ " + x + ", " + y);
  }
}

// set display to show node edit menu
function node_edit_menu(x, y) {
  if (document.getElementById("edit_mode").checked) {
    clicked_x = x;
    clicked_y = y;

    menu.innerHTML = node_menu_html_top + node_name + node_menu_html_bottom;
    if (verbose) menu.innerHTML += "x: " + x + " y: " + y;
    menu.style["margin-left"] = x;
    menu.style["margin-top"]  = y;
    menu.style["display"]     = "block";
    if (verbose) console.log("New node menu @ " + x + ", " + y);
  }
}

// generate a node from a menu
function node_from_menu() {
  let new_label = document.getElementById("new_label").value;

  let node_id = nodes.get(new_label.replace(/\s+/g, ''));
  if (node_id != null) {
    document.getElementById("new_label").placeholder = new_label + " already exists.";
    document.getElementById("new_label").value = "";
    network.moveTo(node_id);
  }
  else {
    new_node(new_label, document.getElementById("final").checked);
  }
}

// close the menu
function close_menu(){
  menu.style["display"] = "none";
}
