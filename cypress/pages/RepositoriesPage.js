export class RepositoriesPage {
  open() {
    // Always navigate through the Home page to respect SPA routing (GitHub Pages)
    cy.visit('/');

    // Access Repositories page via navbar instead of direct URL
    cy.contains('a', /repositories|reposit[oó]rios/i).click();

    // Ensure page content is visible before continuing
    this.title().should('be.visible');
  }

  title() {
    // Page title can be either h1 or h2 depending on layout
    return cy.contains('h1, h2', /repositories|reposit[oó]rios/i);
  }

  expandSection(sectionTitleRegex) {
    // Accordion headers are rendered as buttons
    cy.contains('button', sectionTitleRegex).click();
  }

  cards() {
    // Use a resilient selector based on visible user actions
    return cy
      .contains('a', /view repository/i)
      .parents()
      .first();
  }

  viewRepositoryLinks() {
    // Ensure at least one repository link is rendered
    return cy.contains('a', /view repository/i).should('have.length.greaterThan', 0);
  }

  getAllViewRepositoryHrefs() {
    // Collect all repository links for validation
    return cy
      .contains('a', /view repository/i)
      .should('have.length.greaterThan', 0)
      .then(($links) => [...$links].map((a) => a.getAttribute('href')));
  }
}
