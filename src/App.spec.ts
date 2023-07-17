export {};
// app.spec.ts
describe('App component structure', () => {
    beforeEach(() => {
      cy.visit('/')  // replace with your app url
    });
  
    it('successfully loads and renders all child components', () => {
      cy.get('[data-cy=menu-bar]').should('be.visible')
      cy.get('[data-cy=header]').should('be.visible')
      cy.get('[data-cy=sidebar]').should('be.visible')
      cy.get('[data-cy=canvas]').should('be.visible')
      cy.get('[data-cy=inspector]').should('be.visible')
      cy.get('[data-cy=copilot]').should('be.visible')
      cy.get('[data-cy=quick-prompt]').should('be.visible')
      cy.get('[data-cy=footer]').should('be.visible')
    });
  
    it('renders child components in the correct order', () => {
      cy.get('.App')
        .children()
        .then((children) => {
          cy.wrap(children[0]).should('have.attr', 'data-cy', 'menu-bar')
          cy.wrap(children[1]).should('have.attr', 'data-cy', 'header')
          cy.wrap(children[2]).should('have.attr', 'data-cy', 'sidebar')
          cy.wrap(children[3]).should('have.attr', 'data-cy', 'canvas')
          cy.wrap(children[4]).should('have.attr', 'data-cy', 'inspector')
          cy.wrap(children[5]).should('have.attr', 'data-cy', 'copilot')
          cy.wrap(children[6]).should('have.attr', 'data-cy', 'quick-prompt')
          cy.wrap(children[7]).should('have.attr', 'data-cy', 'footer')
        });
    });
  });
  