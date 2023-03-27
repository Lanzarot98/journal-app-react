import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
import 'setimmediate';
// import { getEnvironments } from './src/helpers/getEnvironments';

// quiero que en el ambiente de desarrollo-testing use este:
require( 'dotenv' ).config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));
