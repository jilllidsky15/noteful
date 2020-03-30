import React, { Component } from "react";
import Context from './Context';
import ValidationError from "./ValidationError";

class AddNote extends Component {
    static contextType = Context

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false,
            }
        }
    }

    updateName(name) {
        this.setState({
            name: {
                value: name,
                touched: true,
            }
        })
    }

    validateName() {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return "Name is required";
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date(),
        }

        this.context.addNote(newNote)
    }

    render() {
        const nameError = this.validateName()
        return (
            <form className="add-note-form" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Note</h2>
                <div className="add-note-container">
                    <label htmlFor="name">Name: </label>
                        <input type="text" className="add-note-input"
                            name="note-name" id="name" aria-required="true" onChange={e => this.updateName(e.target.value)} />
                        {this.state.name.touched && <ValidationError message={nameError} />}
                    <label htmlFor="content">Content: </label>
                        <input type="text" className="add-note-input"
                            name="note-content" id="content" aria-required="true" />

                    <label htmlFor="Folder" className="folder-name-drop-down">Folder:</label>
                        <select name="note-folder-id" className="folder-drop-down">
                            {this.context.folders.map(folder =>
                                <option
                                    value={folder.id}
                                    key={folder.id}>{folder.name}</option>
                            )}
                        </select>

                    <button
                        type="submit"
                        className="save-note-button"
                        disabled={
                            this.validateName()
                        }
                    >
                        Save
                    </button>
                </div>
            </form >
        )
    }
}

export default AddNote
