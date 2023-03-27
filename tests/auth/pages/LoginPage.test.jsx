import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

// important start with the word mock because if not, this could'n work
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword= jest.fn();

jest.mock('../../../src/store/auth/thunks', () =>({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
})); // abro la función con parentesis para regresar el objeto

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('Test in <LoginPage />', () => { 

    beforeEach(() => jest.clearAllMocks() );
    
    test('should show the component correctly', () => { 
        
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    
    });

    test('should the google button call startGoogleSignIn', () => { 
        
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // console.log( store.getState() ); // antes de presionar

        // screen.debug();
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn ); // en este punto estoy intentando dar click en un botón deshabilitado
        // a menos que configure el estado por defecto como no autenticado.
        // console.log(googleBtn);

        // console.log( store.getState() ); // después de presionar
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });

    test('should submit have to call startLoginWithEmailPassword', () => { 
        
        const email    = 'luis@google.com';
        const password = '123456';

        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Email' });
        // console.log( emailField );
        fireEvent.change( emailField, { target: { name: 'email', value: email } } );

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })

        // screen.debug();
    
    })

});
