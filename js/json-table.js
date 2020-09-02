class Table {
  constructor(element) {
    // the html element we export to
    this.element = element;

    // converts row / col to index and vice versa
    this.rows    = {};
    this.col     = {};

    // contains the data
    this.data    = [];
  }

  import() {
    try {
      content = this.json.get();
    }
    catch (SyntaxError){
      alert("Invalid JSON! " + SyntaxError + ".");
      this.export();
      return -1;
    }
    this.delete();

    // add nodes
    for (const i in content.nodes) {
      this.new_node(content.nodes[i]);
    }

    // add symbols to language
    for (const i in content.edges) {
      this.alphabet.add(i);
      // loop through each symbol
      for (const j in content.edges[i]) {
        this.new_edge(i, content.edges[i][j]["from"], content.edges[i][j]["to"]);
      }
    }
  }

  export() {

  }

  update() {
    this.element.innerHTML = "<tr><td>hi</td><tr>";
  }
}
