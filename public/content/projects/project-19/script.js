const notesContainer = document.getElementById('notesContainer');
const addNoteBtn = document.getElementById('addNoteBtn');
const emptyMsg = document.getElementById('emptyMsg');

// Load notes from localStorage on startup
let notes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');

// Initial render
renderNotes();

addNoteBtn.addEventListener('click', () => {
    const newNote = {
        id: Date.now(),
        content: ''
    };

    notes.push(newNote);
    saveNotes();
    renderNotes();
});

function renderNotes() {
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        notesContainer.appendChild(emptyMsg);
        emptyMsg.style.display = 'block';
        return;
    } else {
        emptyMsg.style.display = 'none';
    }

    notes.forEach(note => {
        const noteElement = createNoteElement(note.id, note.content);
        notesContainer.appendChild(noteElement);
    });
}

function createNoteElement(id, content) {
    const div = document.createElement('div');
    div.classList.add('note');

    const textarea = document.createElement('textarea');
    textarea.value = content;
    textarea.placeholder = "Type here...";

    // Auto-save on input
    textarea.addEventListener('input', (e) => {
        updateNoteContent(id, e.target.value);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', () => {
        deleteNote(id);
    });

    div.appendChild(textarea);
    div.appendChild(deleteBtn);

    return div;
}

function updateNoteContent(id, newContent) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.content = newContent;
        saveNotes();
    }
}

function deleteNote(id) {
    const doDelete = confirm('Are you sure you want to delete this note?');
    if (doDelete) {
        notes = notes.filter(n => n.id !== id);
        saveNotes();
        renderNotes();
    }
}

function saveNotes() {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
}
