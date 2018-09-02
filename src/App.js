import React, { Component } from 'react';
import Select from 'react-select'
import MonacoEditor from 'react-monaco-editor';
import './App.css';

const examples = [
  { value: './examples/GPLCARD.hlcl', label: 'GPLCARD.hlcl' },
  { value: './examples/MCS.plc', label: 'MCS.plc' }
]

const compilers = [
  { value: 'Compiler 1', label: 'Compiler 1' },
  { value: 'Compiler 2', label: 'Compiler 2' },
  { value: 'Compiler 3', label: 'Compiler 3' }
]

const options = {
  contextmenu: false,
  fontSize: 15,
  minimap: {
    enabled: false
  },
  selectOnLineNumbers: true,
};

const styles = {
  control: styles => ({
    ...styles,
    borderColor: 'transparent',
    cursor: 'pointer',
    ':active': {
      borderColor: 'transparent',
    },
    ':hover': {
      borderColor: 'transparent',
    }
  }),
  option: styles => ({
    ...styles,
    color: 'black',
  })
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      selectedCompiler: compilers[0],
      selectedExample: examples[0],
    }
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleExampleChange = this.handleExampleChange.bind(this);
    this.handleCompilerChange = this.handleCompilerChange.bind(this);
  }
  componentWillMount() {
    this.loadExample();
  }
  loadExample() {
    import(`${this.state.selectedExample.value}`)
      .then(file => fetch(file))
      .then(response => response.text())
      .then(text => this.setState({ code: text }));
  }
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  handleEditorChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  handleExampleChange(selectedExample) {
    this.setState({ selectedExample }, () => this.loadExample());
  }
  handleCompilerChange(selectedCompiler) {
    this.setState({ selectedCompiler });
  }
  render() {
    return (
      <div id="app">
        <header>
          <h1>Coffee Playground</h1>
          <Select
            className="select"
            options={examples}
            onChange={this.handleExampleChange}
            styles={styles}
            value={this.state.selectedExample}/>
          <Select
            className="select"
            options={compilers}
            onChange={this.handleCompilerChange}
            styles={styles}
            value={this.state.selectedCompiler}/>
        </header>
        <main>
          <a className="run-btn" title="Run solver">
            <svg width="35" height="35" viewBox="3.5,4.5,24,24">
              <path d="M 11 9 L 24 16 L 11 23 z"></path>
            </svg>
          </a>
          <section className="editor">
            <MonacoEditor
              height="100%"
              language="javascript"
              theme="vs-dark"
              value={this.state.code}
              options={options}
              onChange={this.handleEditorChange}
              editorDidMount={this.editorDidMount}
            />
          </section>
          <section className="output">
            <p className="dummy">Hit the run button to see the output here</p>
          </section>
        </main>
        <footer>
          <nav>
            <a href="https://github.com/angievig/coffee" title="Visit this project's source code on Github">Source Code</a>
            <a href="https://github.com/angievig/coffee" title="About the Coffee language">About this project</a>
            <a href="https://github.com/angievig/coffee" title="Research associated with this project">Publications</a>
          </nav>
        </footer>
      </div>
    );
  }
}

export default App;
