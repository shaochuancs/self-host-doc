/**
 * Created by cshao on 2022/12/21.
 */

'use strict';

import {EditorState} from 'prosemirror-state';
import {EditorView} from 'prosemirror-view';
import {Schema, DOMParser} from 'prosemirror-model';
import {schema} from 'prosemirror-schema-basic';
import {addListNodes} from 'prosemirror-schema-list';
import {exampleSetup} from 'prosemirror-example-setup';

const React = require('react');

class Editor extends React.Component {

  componentDidMount() {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks
    });
    new EditorView(document.getElementById('editor'), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.getElementById('content')),
        plugins: exampleSetup({schema: mySchema})
      })
    })
  }

  render() {
    return (
      <>
        <h1>Hello, editor!</h1>
        <div id='editor'></div>
        <div id='content'></div>
      </>
    );
  }
}

export default Editor;