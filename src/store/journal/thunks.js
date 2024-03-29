import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        // TODO: tarea dispatch
        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }
        
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote ); // const setDocResp =
        
        newNote.id = newDoc.id; // le creo la propiedad id a la nota

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        
    }
}

export const startLoadingNotes = (  ) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error("UID of User doesn't exist"); // nunca deberíamos de ver este error

        const loadAllNotes = await loadNotes( uid );
        dispatch( setNotes(loadAllNotes) );

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;

        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        //impactar la base de datos:
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( noteUpdated( note ) ); // debe ser note, porque debo tener el id para evaluar el condicional

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );

        console.log( photosUrls );
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );
        
        dispatch( deleteNoteById(note.id) )
    }
}
