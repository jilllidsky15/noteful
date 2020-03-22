import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class FolderNav extends Component {
    render() {
        // console.log(this.props.folders)
        return (
            <div className="note-list-nav-container">
                <ul className="folder-list">
                    {this.props.folders.map(folder =>
                        <li className={`folder-item ${this.props.selectedFolder === folder.name ? 'active-folder' : ''}`}>
                          <NavLink to={`/folders/${folder.id}`}>
                            <span>{folder.name}</span>
                          </NavLink>
                        </li>
                    )}
                </ul>
                <button type="button" className="add-folder">Add Folder</button>
            </div>
        )
    }
}

export default FolderNav;