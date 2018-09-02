import React, { Component } from 'react';
import Select from 'react-select'
import MonacoEditor from 'react-monaco-editor';
import './App.css';

const compilers = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }
  render() {
    const options = {
      selectOnLineNumbers: true,
      fontSize: 15
    };
    const selectStyles = {
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
    return (
      <div id="app">
        <header>
          <h1>Coffee Playground</h1>
          <p>
            Welcome to the Coffee playground.
            In this website you can try several examples with different compilers or even download the generated sources.
          </p>
          <p>
            To get started, please select a compiler first:&nbsp;&nbsp;
            <Select
              id="compilers"
              options={compilers}
              styles={selectStyles}/>
          </p>
        </header>
        <main>
          <a className="run-btn" title="Run solver">
            <svg width="35" height="35" viewBox="3.5,4.5,24,24">
              <path d="M 11 9 L 24 16 L 11 23 z"></path>
            </svg>
          </a>
          <section className="editor">
            <MonacoEditor
              height="96%"
              language="javascript"
              theme="vs-dark"
              value={this.state.code}
              options={options}
              onChange={this.onChange}
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
