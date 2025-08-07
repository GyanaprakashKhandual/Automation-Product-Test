class App {
    
    openApp() {
        cy.visit('https://codetestrepeat.vercel.app/');
        cy.title().should('include', 'Code with Chris - Your Complete Tech Hub');
    }

    openAbout() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'About').click();
        cy.url().should('include', '/about');
    }

    openEduction() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Education').click();
        cy.url().should('include', '/education');
    }

    openProjects() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Projects').click();
        cy.url().should('include', '/projects');
    }

    openContact() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Contact').click();
        cy.url().should('include', '/contact');
    }

    openBlog() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Blogs').click();
        cy.url().should('include', '/blog');
    }
    openWork() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Work').click();
        cy.url().should('include', '/work');
    }

    openDevelopment() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Development').click();
        cy.url().should('include', '/development');
    }
    openGuides() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Guides').click();
        cy.url().should('include', '/guides');
    }
    openSkills() {
        this.openApp(); // Reuse openApp to avoid repeating cy.visit
        cy.contains('button', 'Skills').click();
        cy.url().should('include', '/skills');
    }

}

export default App;
