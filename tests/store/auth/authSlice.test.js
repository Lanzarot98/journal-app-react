import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";



describe('Pruebas en el authSlice', () => { 
    test('should de regresar el estado inicial y llamarse "auth"', () => { 
        
        const state = authSlice.reducer( initialState, {} );
        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );  
     
    });

    test('Debe de realizar la autenticación', () => { 
     
        // console.log( login( demoUser ) );
        const state = authSlice.reducer( initialState, login( demoUser ) ); // 
        // console.log(state);
        expect( state ).toEqual({
            status: 'authenticated', // 'checking' 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: demoUser.errorMessage,
        });
    
    });

    test('Debe de realizar el logout sin argumentos', () => { 
        
        const state = authSlice.reducer( authenticatedState, logout( ) );
        // console.log(state)
        expect( state ).toEqual(notAuthenticatedState);
    
    });
    
    test('Debe de realizar el logout y mostrar un mensaje de error', () => { 

        const errorMessage = 'Credenciales incorrectas';
        
        const state = authSlice.reducer( authenticatedState, logout( {errorMessage} ) );
        // console.log(state);
        expect( state ).toEqual({
            status: notAuthenticatedState.status, // 'checking' 'not-authenticated', 'authenticated'
            uid: notAuthenticatedState.uid,
            email: notAuthenticatedState.email,
            displayName: notAuthenticatedState.displayName,
            photoURL: notAuthenticatedState.photoURL,
            errorMessage: errorMessage,
        });
    
    });

    test('should debe de cambiar el estado a checking', () => { 
        
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
        
    })

});