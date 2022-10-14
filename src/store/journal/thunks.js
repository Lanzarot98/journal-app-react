import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote } from "./";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        // TODO: tarea dispatch
        dispatch( savingNewNote() );
        
        // console.log(getState());
        const { uid } = getState().auth;
        // uid
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }
        
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        const setDocResp = await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id; // le creo la propiedad id a la nota
        
        // dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        // dispatch( activarNote )


    }
}