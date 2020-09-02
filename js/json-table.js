class Table {
  constructor(element, json) {
    // the html element we export to
    this.element  = element;
    this.json     = json;

    // converts row / col to index and vice versa
    this.states   = {};
    this.alphabet = {};

    // contains the data
    this.data     = [];

    this.import();
  }

  import() {
    let out = "";
    let content = {};
    try {
      content = this.json.get();
    }
    catch (SyntaxError){
      alert("Invalid JSON! " + SyntaxError + ".");
      return -1;
    }

    // construct vertical header
    this.data.push([""]);
    for (const i in content.nodes) {
      this.data.push([content.nodes[i]]);
      this.states[content.nodes[i]] = {
        "elements": [],
        "values": [],
        "index": i,
      };
    }

    // construct horizontal header
    for (const i in content.edges) {
      this.data[0].push(i);
      for (const j in content.edges[i]) {
        if (this.states[content.edges[i][j].from].values[i] == undefined) this.states[content.edges[i][j].from].values[i] = [];
        this.states[content.edges[i][j].from].values[i].push(content.edges[i][j].to);
      }
    }

    console.log(this.data);
    for (const i in this.data) {
      out += "<tr>";
      for (const j in this.data[0]) {
        out += `<td> <input type="text" id=_` + this.data[i][0] + j + `>`;
        out += `</input></td>`;
      }
      out += "</tr>";
    }

    this.element.innerHTML = out;

    console.log(this.states);

    // add elements to dict
    for (let i = 1; i < this.data.length; i++) {
      for (let j = 1; j < this.data[0].length; j++) {
        let element = document.getElementById("_" + this.data[i][0] + j);
        this.states[this.data[i][0]].elements.push(element);
        element.value = 0;
      }
    }
  }

  export() {

  }

  update() {
  }
}
