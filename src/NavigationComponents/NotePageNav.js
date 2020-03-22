import React, { Component } from 'react';

class NotePageNav extends Component {
    render() {
      // console.log(this.props)
        return (
            <div className="note-page-nav-container">
              <button type="button" className="go-back" onClick={() => this.props.history.goBack()}>Go Back</button>
              <h3>Folder: {this.props.folderName}</h3>
            </div>
        )
    }
}

export default NotePageNav;