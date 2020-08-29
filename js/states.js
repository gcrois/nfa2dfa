const arrow_type = "to";
const default_color = "green";
let n_edges = 0;
let n_nodes = 0;

function Transition(id, symbol, from, to) {
  this.id = id;
  this.arrows = arrow_type;
  this.label = symbol;
  this.from = from;
  this.to = to;
  this.color = default_color;
}

function State(id, label, transitions, accepted) {
  this.id = id;
  this.label = label;
  this.transitions = {
    "ε": new Transition(n_edges++, "ε", this.id, this.id),
  };
  this.accepted = accepted;
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

function new_node(id = input.value, label = input.value, n = network, S = states, E = edges, N = nodes) {
  s = new State(id, label, [], false)
  S.push(s);
  N.update([S[S.length - 1]]);

  for (const i in s.transitions) {
    console.log(i);
    E.update([s.transitions[i]]);
  }

  console.log(E);

  n.redraw();
}

function touch_state(s) {
  let out = "";
}
