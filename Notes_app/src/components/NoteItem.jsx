import React, { useState } from 'react';

function NoteItem({ note, onDelete, onUpdate, isEditing, onSetEditing }) {
    const [editText, setEditText] = useState(note.text);

    const handleSave = () => {
        if (editText.trim().length > 0) {
            onUpdate(note.id, editText);
        }
    };

    const handleCancel = () => {
        setEditText(note.text);
        onSetEditing(null);
    }

    if (isEditing) {
        return (
            <div className="note-item">
                <div className="edit-mode-container">
                    <textarea
                        className="edit-textarea"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    ></textarea>
                    <div className="note-footer" style={{ marginTop: 0 }}>
                        <span className="note-date">{note.date} (editing)</span>
                        <div className="note-actions">
                            <button className="action-btn cancel" onClick={handleCancel}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave} style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="note-item">
            <div className="note-content">
                {note.text}
            </div>
            <div className="note-footer">
                <span className="note-date">{note.date}</span>
                <div className="note-actions">
                    <button className="action-btn edit" onClick={() => onSetEditing(note.id)}>Edit</button>
                    <button className="action-btn delete" onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;
