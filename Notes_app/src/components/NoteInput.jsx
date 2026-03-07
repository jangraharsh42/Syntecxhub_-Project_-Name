import React, { useState } from 'react';

function NoteInput({ onAddNote }) {
    const [noteText, setNoteText] = useState('');
    const charLimit = 100;

    const handleChange = (e) => {
        if (charLimit - e.target.value.length >= 0) {
            setNoteText(e.target.value);
        }
    };

    const handleSave = () => {
        if (noteText.trim().length > 0) {
            onAddNote(noteText);
            setNoteText('');
        }
    };

    const remaining = charLimit - noteText.length;
    let counterClass = 'char-counter';
    if (remaining <= 20 && remaining > 0) counterClass += ' near-limit';
    if (remaining === 0) counterClass += ' limit-reached';

    return (
        <div className="note-creator">
            <textarea
                className="note-textarea"
                placeholder="Capture your thought here..."
                value={noteText}
                onChange={handleChange}
            ></textarea>

            <div className="creator-footer">
                <span className={counterClass}>
                    {remaining} characters remaining
                </span>
                <button
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={noteText.trim().length === 0}
                >
                    Save Note
                </button>
            </div>
        </div>
    );
}

export default NoteInput;
