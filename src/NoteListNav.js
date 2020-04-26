import React, { Component } from 'react';
import { NavLink, Link } from "react-router-dom";
import Context from './Context';

class NoteListNav extends Component {
    static contextType = Context;
    render() {
        const { folders } = this.context
        const folderId = parseInt(this.props.match.params.folderId)
        const selectedFolder = folders.find(folder => folder.id === folderId)
        return (
            <div className="note-list-nav-container">
                <ul className="folder-list">
                    {folders.map(folder =>
                        <li className={`folder-item ${selectedFolder === folder.folder_name ? 'active-folder' : ''}`} key={folder.id}>
                            <NavLink to={`/folders/${folder.id}`}>
                                <span>{folder.folder_name}</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
                <Link to="/add-folder" type="button" className="add-folder-button">Add Folder</Link>
            </div>
        )
    }
}

export default NoteListNav;