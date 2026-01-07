import { RepositoriesPage } from '../pages/RepositoriesPage';

describe('Repositories Page - E2E Tests', () => {
  const page = new RepositoriesPage();

  beforeEach(() => {
    // Open Repositories page through user navigation flow
    page.open();
  });

  it('Repositories_Should_Open_And_Display_Title', () => {
    // Validate that the page title is rendered
    page.title().should('be.visible');
  });

  it('Repositories_Should_Render_At_Least_One_Card', () => {
    // Expand Test Repositories section
    page.expandSection(/test repositories/i);

    // Ensure at least one repository card/link is displayed
    cy.contains('a', /view repository/i).should('exist');
  });

  it('Repositories_ViewRepository_Links_Should_Point_To_GitHub', () => {
    // Expand Test Repositories section
    page.expandSection(/test repositories/i);

    // Validate that all repository links redirect to GitHub
    page.getAllViewRepositoryHrefs().then((hrefs) => {
      hrefs.forEach((href) => {
        expect(href, `href: ${href}`).to.match(/github\.com/i);
      });
    });
  });
});
