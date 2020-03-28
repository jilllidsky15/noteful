import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Context from './Context';

class Note extends Component {
    static contextType = Context

    handleDeleteNote = () => {
        this.context.deleteNote(this.props.id)
        this.props.history.replace('/')
    }

    render() {
        return (
            <div className="note-container">
                <h3>
                    <Link to={`/notes/${this.props.id}`} className="note-name">{this.props.name}</Link>
                </h3>
                <p className="modified">{this.props.modified}</p>
                <button type="button" className="delete-note" onClick={this.handleDeleteNote}>Delete Note</button>
            </div>
        )
    }
}

export default Note;