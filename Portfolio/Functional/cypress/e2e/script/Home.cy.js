import app from '../utils/app.js';

const appInstance = new app();

describe('Home Page Tests', () => {

    it('should open the app', () => {
        appInstance.openApp();
    });

    it('should navigate to the About page', () => {
        appInstance.openAbout();
    });

    it('should navigate to the Education page', () => {
        appInstance.openEduction();
    });

    it('should navigate to the Projects page', () => {
        appInstance.openProjects();
    });

    it('should navigate to the Contact page', () => {
        appInstance.openContact();
    });

    it('should navigate to the Blog page', () => {
        appInstance.openBlog();
    });

    it('should navigate to the Work page', () => {
        appInstance.openWork();
    });

    it('should navigate to the Development page', () => {
        appInstance.openDevelopment();
    });

    it('should navigate to the Guides page', () => {
        appInstance.openGuides();
    });

    it('should navigate to the Skills page', () => {
        appInstance.openSkills();
    });     
    

});