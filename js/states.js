const arrow_type = "to";
const default_color = "green";
let n_edges = 0;

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
    "e": new Transition(n_edges++, "e", this.id, this.id),
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
