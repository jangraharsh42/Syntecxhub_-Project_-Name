import React from 'react';
import NoteItem from './NoteItem';

function NotesContainer({ notes, onDeleteNote, onUpdateNote, editingId, setEditingId }) {
    if (notes.length === 0) {
        return (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                No notes yet. Add your first note above!
            </div>
        );
    }

    return (
        <div className="notes-grid">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={onDeleteNote}
                    onUpdate={onUpdateNote}
                    isEditing={editingId === note.id}
                    onSetEditing={setEditingId}
                />
            ))}
        </div>
    );
}

export default NotesContainer;
