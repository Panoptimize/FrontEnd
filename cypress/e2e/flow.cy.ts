describe('template spec', () => {

  beforeEach(() => { //Para hacer cualquier cosa que necesitemos antes de nuestros tests, limpiar por ejemplo
    //indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.viewport('macbook-16');
    cy.visit('/')

  })


  it('should render the login form', () => {
    indexedDB.deleteDatabase('firebaseLocalStorageDb');
    cy.visit('/')
    cy.get('p').contains("Company name"); //para recuperar el titulo de login
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
    cy.get('button[type="submit"]').click();

    //cy.visit('https://example.cypress.io') NO VISIT porque ya esta en base
  })

  it('should display an error message for invalid credentialas', () => {
    cy.get('p').contains("Company name"); //para recuperar el titulo de login
    cy.get('input[name="email"]').type('invalid@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('[data-test="txt-error"]').should('contain', 'Firebase: Error (auth/invalid-credential).')

    //cy.visit('https://example.cypress.io')
  })

  it('should navigate to dashboard on sucessful login', () => {
    cy.get('p').contains("Company name"); //para recuperar el titulo de login
    cy.get('input[name="email"]').type(Cypress.env('EMAIL'));
    cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/auth');
    cy.get('[data-testid= "wrapper-Dashboard"]').should('exist');
    cy.get('[data-testid="txt-AgentStatus"]').should('contain', 'Agents Status');
    cy.get('[data-testid="txt-OverallPerformance"]').should('contain', 'Overall Performance');
  })

  it('should navigate to action center on sucessfull click', () => {
    cy.get('[data-testid="action_center_link"]').click();
    cy.get('[data-testid= "wrapper-ActionCenter"]').should('exist');
    cy.get('[data-testid="txt-agentStatus"]').should('contain', 'Agents Status');
    cy.get('[data-testid="txt-CurrentAgents"]').should('contain', 'Current Agents');
  })

  it('should navigate to agents on sucessfull click', () => {
    cy.get('[data-testid="agents_link"]').click();
    cy.get('[data-testid= "wrapper-Agents"]').should('exist');
    cy.get('[data-testid="txt-agents"]').should('contain', 'Agents');
  })

  it('should logout on successful click', () => {
    cy.get('[data-testid="logout_buttonn"]').should('be.visible').click();

    cy.get('p').contains("Company name");
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    
  });

})