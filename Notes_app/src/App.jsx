import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import NotesContainer from './components/NotesContainer';

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_notes_app');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('nexus_notes_app', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: uuidv4(),
      text,
      date: new Date().toLocaleDateString()
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const updateNote = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
    setEditingId(null);
  };

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {!editingId && <NoteInput onAddNote={addNote} />}
        <NotesContainer
          notes={notes}
          onDeleteNote={deleteNote}
          onUpdateNote={updateNote}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </main>
    </div>
  );
}

export default App;
