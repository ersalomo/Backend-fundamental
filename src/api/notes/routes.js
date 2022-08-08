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
    handler: handler.getNoteByIdHandler, // getNotesById
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.deleteNotesByIdHandler, // deleteNoteById
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.editNotesByIdHandler, // updateNoteById
  },
]

module.exports = routes
