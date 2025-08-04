import app from '../utils/app.js';

const appInstance = new app();

describe('Home Page Tests', () => {

    it('should open the app', () => {
        appInstance.openApp();
    });

});