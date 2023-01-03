const notes = require("./notes");
const { nanoid } = require("nanoid");

const getAllNotesHandler = () => {
  return {
    status: "success",
    data: {
      notes: notes,
    },
  };
};

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id == id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    console.log(notes);
    return response;
  }
};

const getNoteById = (request, h) => {
  const { id } = request.params;
  const note = notes.find((notes) => notes.id == id);
  if (note !== null) {
    const response = h.response({
      status: "success",
      data: { note },
    });
    return response;
  } else {
    return {
      status: "not found",
      statusCode: 404,
    };
  }
};

const editNoteById = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const index = notes.findIndex((note) => note.id == id);

  if (index == -1) {
    const response = h.response({
      status: "note tidak ditemukan",
      statusCode: 404,
    });
    return response;
  }

  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt: new Date().toISOString(),
  };

  return {
    status: "success",
    statusCode: 204,
    message: "Catatan berhasil diperbarui",
  };
};

const deleteNoteById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id == id);

  notes.splice(index, 1);

  return {
    status: "Note berhasil dihapus",
    statusCode: 205,
  };
};

module.exports = {
  getAllNotesHandler,
  addNoteHandler,
  getNoteById,
  editNoteById,
  deleteNoteById,
};
