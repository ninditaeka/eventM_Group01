import Login from '../../app/login/page';
import { AppRouterProvider } from '../../../cypress/support/test-utils';
import { mount } from 'cypress/react';

describe('Login Component', () => {
  beforeEach(() => {
    cy.mount(
      <AppRouterProvider>
        <Login />
      </AppRouterProvider>,
    );
  });

  it('should display all login form elements', () => {
    cy.get('h1').contains('EventBuzz').should('be.visible');
    cy.get('h1').contains('Log in').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Log in').should('be.visible');
    cy.get('a[href="/register"]').should('be.visible');
  });

  it('should navigate to register page when clicking register link', () => {
    cy.get('a[href="/register"]').click();
    cy.get('a[href="/register"]').should('have.attr', 'href', '/register');
  });
});
