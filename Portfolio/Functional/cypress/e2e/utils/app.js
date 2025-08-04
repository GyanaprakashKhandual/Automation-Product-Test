class app {

    openApp() {
        cy.visit('https://codetestrepeat.vercel.app/');
        cy.title().should('include', 'Code with Chris - Your Complete Tech Hub');
    }
}

export default app;