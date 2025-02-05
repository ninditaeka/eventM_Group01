// cypress/component/Login.cy.tsx
import Login from '../../src/app/login/page';
import { mount } from 'cypress/react';

describe('Login Component', () => {
  beforeEach(() => {
    // Mock the router before mounting
    const router = {
      push: cy.stub().as('routerPush'),
      prefetch: cy.stub().resolves(),
      route: '/',
      pathname: '/',
    };

    cy.stub(require('next/navigation'), 'useRouter').returns(router);

    // Mount the component
    cy.mount(<Login />);
  });

  // Test UI elements presence
  it('should display all login form elements', () => {
    cy.get('h1').contains('EventBuzz').should('be.visible');
    cy.get('h1').contains('Log in').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Log in').should('be.visible');
    cy.get('a[href="/register"]').should('be.visible');
  });

  // Test form validation
  describe('Form Validation', () => {
    it('should show validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
      cy.get('.text-red-500').should('have.length', 2);
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should show error for invalid email format', () => {
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Invalid email address').should('be.visible');
    });

    it('should show error for short password', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('12345');
      cy.get('button[type="submit"]').click();
      cy.contains('Password must be at least 6 characters').should(
        'be.visible',
      );
    });
  });

  // Test successful login
  it('should handle successful login', () => {
    // Mock the authLogin function
    cy.window().then((win) => {
      cy.stub(win, 'fetch').resolves({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    });

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Check for success toast
    cy.get('.Toastify').contains('Log in successful!').should('be.visible');
    // Verify router.push was called
    cy.get('@routerPush').should('have.been.calledWith', '/');
  });

  // Test failed login
  it('should handle failed login', () => {
    // Mock the authLogin function with error
    cy.window().then((win) => {
      cy.stub(win, 'fetch').rejects({
        response: {
          data: { status: 'email or password wrong ' },
        },
      });
    });

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Check for error toast
    cy.get('.Toastify').contains('Email already in use').should('be.visible');
  });

  // Test navigation
  it('should navigate to register page when clicking register link', () => {
    cy.get('a[href="/register"]').click();
    // Verify the link exists and has the correct href
    cy.get('a[href="/register"]').should('have.attr', 'href', '/register');
  });
});
