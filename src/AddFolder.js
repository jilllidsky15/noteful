import React, { Component } from "react";
import Context from './Context';
import ValidationError from "./ValidationError";

class AddFolder extends Component {
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
        const newFolder = {
            name: e.target['folder-name'].value
        }
        // console.log(newFolder);


        this.context.addFolder(newFolder)
        this.props.history.replace('/')
    }

    render() {
        const nameError = this.validateName()
        return (
            <form className="add-folder-form" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add a Folder</h2>

                <label htmlFor="name">Name: </label>
                <input type="text" className="add-folder-input"
                    name="folder-name" id="name" aria-required="true" onChange={e => this.updateName(e.target.value)} />
                {this.state.name.touched && <ValidationError message={nameError} />}

                <button type="submit" className="save-folder-button">
                    Save
                </button>
            </form >
        )
    }
}

export default AddFolder
