import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Context from './Context';
import PropTypes from 'prop-types';
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

Note.propTypes = {
    history: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
}

export default Note;