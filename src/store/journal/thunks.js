import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes } from "./";
import { loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        // TODO: tarea dispatch
        dispatch( savingNewNote() );

        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        const setDocResp = await setDoc( newDoc, newNote );
        
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

