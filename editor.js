class TextEditor {
  constructor() {
    this.text = "";
    this.undoStack = [];
    this.redoStack = [];
  }

  insert(newText) {
    this.undoStack.push(this.text);
    this.redoStack = [];
    this.text += newText;
    this.updateTextArea();
  }

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(this.text);
      this.text = this.undoStack.pop();
      this.updateTextArea();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(this.text);
      this.text = this.redoStack.pop();
      this.updateTextArea();
    }
  }

  getText() {
    return this.text;
  }

  updateTextArea() {
    document.getElementById("editor").value = this.text;
  }

  syncWithTextArea() {
    this.text = document.getElementById("editor").value;
  }
}

const textEditor = new TextEditor();

function insertText() {
  const insert = prompt("Enter text to insert:");
  if (insert !== null) {
    textEditor.syncWithTextArea();
    textEditor.insert(insert);
  }
}

function display() {
  document.getElementById("output").textContent = textEditor.getText();
}
