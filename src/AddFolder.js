import React, { Component } from "react";
import Context from './Context';

class AddFolder extends Component {
    static contextType = Context

    handleSubmit = e => {
        e.preventDefault();
        const newFolder = {
            name: e.target['folder-name'].value
        }
        // console.log(newFolder);


        this.context.addFolder(newFolder)
    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Folder</h2>

                <label htmlFor="name">Name: </label>
                <input type="text" className="add-folder-input"
                    name="folder-name" id="name"
                />

                <button type="submit" className="save-folder-button">
                    Save
                </button>
            </form >
        )
    }
}

export default AddFolder
