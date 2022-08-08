const ClientError = require('../../exceptions/ClientError')

class NotesHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    /*
    Ketahuilah! Fungsi bind adalah member dari Function.prototype
    di mana setiap function JavaScript dapat mengakses fungsi ini.
    Fungsi bind berfungsi untuk mengikat implementasi function agar
    ia tetap memiliki konteks sesuai nilai yang ditetapkan pada
    argumen yang diberikan pada fungsi bind tersebut
    */
    this.postNoteHandler = this.postNoteHandler.bind(this)
    this.getNotesHandler = this.getNotesHandler.bind(this)
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this)
    this.editNotesByIdHandler = this.editNotesByIdHandler.bind(this)
    this.deleteNotesByIdHandler = this.deleteNotesByIdHandler.bind(this)
  }

  postNoteHandler(request, h) {
    try {
      this._service.validateNotePayload(request.payload)
      const { title = 'untitled', body, tags } = request.payload;
      const noteId = this._service.addNote({ title, body, tags })
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: { noteId },
      }).code(201)
      return response
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        }).code(e.statusCode)
        return response
      }
      // Server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegaglan pada server kami.',
      }).code(500)
      console.log(e)
      return response
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes()

    return {
      status: 'success',
      data: {
        notes,
      },
    }
  }

  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params // parms ?
      const note = this._service.getNoteById(id)
      return {
        status: 'success',
        data: { note },
      }
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        }).code(e.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegaglan pada server kami.',
      }).code(500)
      console.log(e)
      return response
    }
  }

  putNotesByIdHandler(request, h) {
    try {
      this._service.validateNotePayload(request.payload)
      const { id } = request.params
      this._service.editNoteById(id)
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      }
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        }).code(e.statusCode)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegaglan pada server kami.',
      }).code(500)
      console.log(e)
      return response
    }
  }

  deleteNotesByIdHandler(request, h) {
    try {
      const { id } = request.params
      this._service.deleteNoteById(id)
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      }
    } catch (e) {
      if (e instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: e.message,
        }).code(404)
        return response
      }
      // server error
      const response = h.response({
        status: 'fail',
        message: 'Maaf, terjadi kegaglan pada server kami.',
      }).code(500)
      console.error(e)
      return response
    }
  }
}

module.exports = NotesHandler
