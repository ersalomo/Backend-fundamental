/*
pada proses registrasi plugin notes--lebih tepatnya pada objek options
--kita tambahkan properti validator dan beri nilai NotesValidator
*/
const Hapi = require('@hapi/hapi');
// const routes = require('./routes');
const NotesService = require('./services/inMemory/NotesService')
const notes = require('./api/notes')
const NotesValidator = require('./validator/notes')

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // server.route(routes);
  await server.register({
    plugin: notes,
    options: {
      server: notesService,
    },
  })
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
