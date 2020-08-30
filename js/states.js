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
    this.color = default_color;
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
  //let appended = false;

  if (S[to] == undefined) {
    alert("State " + to + " DNE");
  }
  else {
    to_item = N.get(to);
    // check for existing transition to destination
    /*
    for (const i in S[from].transitions) {
      for (const j in S[from].transitions[i]) {
        // if it does, we need to update the label
        if (j.to == to) {
          j.label += ", " + symbol;
          E.update([j]);
          appended = true;
          break;
        }
      }
    }*/
    // if the list to hold these symbols doesn't exist yet, make it
    if (S[from].transitions[symbol] == undefined) {
      S[from].transitions[symbol] = [];
    }
    // add new transition to state, update if not a shared edge
    S[from].transitions[symbol].push(new Transition(n_edges++, symbol, from, to));
    E.update(S[from].transitions[symbol]);
  }
}

function nickname(id = node_name, new_label = "", n = network, S = states, E = edges, N = nodes) {
  if (new_label == "") {
    new_label = document.getElementById("new_label").value;
  }

  S[id].label = new_label + " (" + S[id].label +")";
  N.update([S[id]]);
}

function toggle_final(id = node_name, n = network, S = states, E = edges, N = nodes) {
  if (S[id].accepted == false) {
    S[id].accepted = true;
    S[id].color = "red";
  }
  else {
    S[id].accepted = false;
    S[id].color = default_color;
  }
  N.update([S[id]]);
}

function delete_node(id = node_name, n = network, S = states, E = edges, N = nodes) {
  // ensure that we aren't deleting initial
  if (id == "Init") {
    alert("You cannot delete the initial node!");
    return -1;
  }

  // find and delete edges that contain target node
  for (const i in S) {
    for (const j in S[i].transitions) {
      for (const k in S[i].transitions[j]) {
        if (S[i].transitions[j][k].to == id || i == id) {
          E.remove(S[i].transitions[j][k].id);
          delete S[i].transitions[j][k];
        }
        else {
          if (verbose) console.log(S[i].transitions[j][k].id + " != " + id + " and " + i + " != " + id);
       }
      }
    }
  }
  // remove from graph and dictionary
  N.remove(id);
  delete S[id];
  close_menu();
}
