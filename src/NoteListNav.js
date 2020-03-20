import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class NoteListNav extends Component {
    render() {
        // console.log(this.props.folders)
        return (
            <div className="note-list-nav-container">
                <ul className="folder-list">
                    {this.props.folders.map(folder =>
                        <li className="folder-item">
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

export default NoteListNav;


// <NavLink to="/faq" activeClassName="selected">
  // FAQs
// </NavLink>