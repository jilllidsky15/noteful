import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
// import DummyStore from './dummy-store';
import Header from './Header';
import NoteListNav from './NoteListNav';
import NoteListMain from './NoteListMain';
import NotePageNav from './NotePageNav';
import NotePageMain from './NotePageMain';
import Context from './Context';
import config from './config';
import AddNote from './AddNote';
import AddFolder from './AddFolder';
import ErrorBoundary from './ErrorBoundary';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // change to empty arrays
      folders: [],
      notes: [],
    }
  }

  deleteNote = (noteId) => {
    // console.log(noteId)
    // console.log(this.state.notes) //you should see all notes here
    // console.log(this.state.notes.filter(note => note.id !== noteId)) //you should see filtered notes 

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  addNote = (note) => {
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((addedNote) => {
        // console.log(addedNote)
        this.setState({
          notes: [...this.state.notes, addedNote]
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  addFolder = (folder) => {
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(addedFolder => {
        this.setState({
          folders: [...this.state.folders, addedFolder]
        })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
    }
    return (
      <div>
        <Header />
        <Context.Provider value={contextValue}>
          <div className="container">
            <ErrorBoundary>
              <nav>
                <Route exact path="/"
                  component={NoteListNav}
                />

                <Route path="/folders/:folderId"
                  component={NoteListNav}
                />

                <Route path="/notes/:noteId"
                  component={NotePageNav}
                />
              </nav>
            </ErrorBoundary>
            <ErrorBoundary>
              <main>
                <Route exact path="/"
                  component={NoteListMain}
                />
                <Route path="/folders/:folderId"
                  component={NoteListMain}
                />
                <Route path="/notes/:noteId"
                  component={NotePageMain}
                />
                <Route path="/add-folder"
                  component={AddFolder}
                />
                <Route path="/add-note"
                  component={AddNote}
                />
              </main>
            </ErrorBoundary>
          </div>
        </Context.Provider>
      </div >
    )
  }
}

export default App;