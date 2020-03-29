import React, { Component } from 'react';
import Context from './Context';

class NotePageNav extends Component {
    static contextType = Context;
    render() {
        // console.log(this.props)
        const { notes, folders } = this.context
        // console.log(notes, folders)
        const noteId = this.props.match.params.noteId
        const selectedNote = notes.find(note => note.id === noteId)
        const selectedFolder = folders.find(folder => folder.id === selectedNote.folderId);
        return (
            <div className="note-page-nav-container">
                <button type="button" className="go-back-button" onClick={() => this.props.history.goBack()}>Go Back</button>
                <h3 className="note-page-nav-folder-name">Folder: {selectedFolder.name}</h3>
            </div>
        )
    }
}

export default NotePageNav;