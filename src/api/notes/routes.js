// const { NotesService } = require('/src/services/inMemory/NotesService.js')

const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler, // addNote
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler, // getAllNotes
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.getNotesByIdHandler, // getNotesById
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNoteByIdHandler, // deleteNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.putNoteByIdHandler, // updateNoteById
  },
]
