import React, { Component } from 'react';
import Note from './Note';
import Context from './Context';

class NotePageMain extends Component {
    static contextType = Context
    render() {
        // console.log(this.context)
        const noteId = parseInt(this.props.match.params.noteId)
        const { notes } = this.context
        const selectedNote = notes.find(note => note.id === noteId)
        return selectedNote
            ? (
                <section className="note-page-main-container">
                    <Note {...selectedNote} history={this.props.history} />
                    <p className="note-content">{selectedNote.content}</p>
                </section>
            )
            : <></>
    }
}

export default NotePageMain;