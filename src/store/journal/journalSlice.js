import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
  },
  reducers: {
    savingNewNote: (state) => {
        state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
    },
    setActiveNote: ( state, action ) => {
        state.active = action.payload;
        state.messageSaved = ''; // estoy cambiando de nota activa entonces cambio el mensaje
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    },
    noteUpdated: (state, action) => { // payload: note actualizada
      state.isSaving = false;
      state.notes = state.notes.map( (note) => {

        if( note.id === action.payload.id ) {
          return action.payload;
        }
        return note;
      } );

      state.messageSaved = `${ action.payload.title }, updated correctly`;
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.active = null;
    },
    deleteNodeById: (state, action) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { savingNewNote, 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNodeById
} = journalSlice.actions;
