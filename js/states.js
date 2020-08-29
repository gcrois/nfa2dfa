const arrow_type = "to";
const default_color = "green";
let n_edges = 0;
let n_nodes = 0;

// Transition object for edges
function Transition(id, symbol, from, to) {
  if (symbol == "e") symbol = "ε";
  this.id = id;
  this.arrows = arrow_type;
  this.label = symbol;
  this.from = from;
  this.to = to;
  this.color = default_color;
}

function State(label, transitions, accepted) {
  this.id = label.replace(/\s+/g, '');
  this.label = label;
  this.transitions = {
    "ε": [new Transition(n_edges++, "e", this.id, this.id)],
  };
  this.accepted = accepted;

  if (accepted) {
    this.color = "red";
  }
  else {
    //this.color = "default_color";
  }
}

function e_closure(states, nodes) {
  return states;
}

function move(states, nodes) {
  return states;
}

function state_str(s) {
  let out = "";
}

function new_node(id = input.value, final = 0, n = network, S = states, E = edges, N = nodes) {
  s = new State(id, [], final);
  S[id.replace(/\s+/g, '')] = s;
  N.update([S[id.replace(/\s+/g, '')]]);

  for (const i in s.transitions) {
    if (verbose) console.log(i);
    for (const j in s.transitions[i]) {
      if (verbose) console.log(i);
      E.update([s.transitions[i][j]]);
    }
  }
}

function touch_state(s) {
  let out = "";
}

function add_edge(n = network, S = states, E = edges, N = nodes) {
  let to = document.getElementById("to").value.replace(/\s+/g, '');
  let to_item;
  let symbol = document.getElementById("symbol").value;
  let from = node_name.replace(/\s+/g, '');
  let from_item = N.get(from);

  if (S[to] == undefined) {
    alert("State " + to + " DNE");
  }
  else {
    to_item = N.get(to);
    if (S[from].transitions[symbol] == undefined) S[from].transitions[symbol] = []
    S[from].transitions[symbol].push(new Transition(n_edges++, symbol, from, to))
    E.update(S[from].transitions[symbol]);
    console.log(S[from].transitions[symbol]);
  }

  return 0;
}
