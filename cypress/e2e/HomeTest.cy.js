import HomePage from '../pages/HomePage';

describe('Home Page - E2E Tests', () => {
  // Single page object instance reused in all tests
  const home = new HomePage();

  // Open portfolio before each test
  beforeEach(() => {
    home.open();
  });

  it('Home_Should_Open_And_Display_Expected_Title', () => {
    // Basic smoke: title exists and mentions "Ravi"
    cy.title().should('not.be.empty');
    cy.title().should('contain', 'Ravi');
  });

  it('Navbar_Brand_Should_Redirect_To_Home', () => {
    // Go to another section first
    home.click(home.navbarRepositories);

    // Click brand to return to root
    home.click(home.navbarBrand);

    // GitHub Pages usually ends in "/" or "/index.html"
    cy.url().should('match', /\/($|index\.html$)/);
    cy.title().should('contain', 'Ravi');
  });

  it('Navbar_Should_Navigate_To_Repositories', () => {
    // Repositories link should change the route
    home.click(home.navbarRepositories);
    cy.url().should('match', /repo|projects/i);
  });

  it('Navbar_Should_Navigate_To_Testimonials', () => {
    // Testimonials link should change the route
    home.click(home.navbarTestimonials);
    cy.url().should('match', /recom|testi/i);
  });

  it('Language_Should_Switch_To_English_And_Set_HtmlLang', () => {
    // Switch language and assert <html lang="en*">
    home.selectLanguage('English');

    cy.document().its('documentElement.lang').should('not.be.empty').and('match', /^en/i);
  });

  it('Theme_Toggle_Should_Switch_Theme_And_Colors', () => {
    // Capture initial UI state for the theme toggle
    home.getThemeUiState().then((before) => {
      // First toggle: expect UI to change
      home.toggleTheme();

      home.getThemeUiState().then((after) => {
        expect(after.text).to.not.equal(before.text);
        expect(after.class).to.not.equal(before.class);
        // Background may stay the same depending on design, so not asserted here
      });

      // Second toggle: expect original state to be restored
      home.toggleTheme();

      home.getThemeUiState().then((again) => {
        expect(again.text).to.equal(before.text);
        expect(again.class).to.equal(before.class);
        expect(again.bg).to.equal(before.bg);
      });
    });
  });

  it('Contact_Should_Open_Modal_And_Validate_Empty_Form', () => {
    // Open modal and try to submit without filling fields
    home.submitEmptyContactForm();

    // Modal close button should be visible
    cy.get(home.btnCloseModal).should('be.visible');

    // HTML5 validation: Name required
    cy.get(home.inputName).then(($el) => {
      expect($el[0].checkValidity()).to.eq(false);
    });

    // HTML5 validation: Email required/invalid
    cy.get(home.inputEmail).then(($el) => {
      expect($el[0].checkValidity()).to.eq(false);
    });
  });

  it('Contact_Should_Show_Error_For_Invalid_Email', () => {
    // Submit form with invalid e-mail format
    home.submitInvalidContactForm();

    cy.get(home.inputEmail).then(($el) => {
      const validity = $el[0].validity;
      // Native browser validity flags
      expect(validity.typeMismatch || validity.valueMissing).to.eq(true);
    });
  });

  it('Contact_Email_Button_Should_Open_Modal', () => {
    // Just check that the email button opens the modal
    home.click(home.btnContactEmail);
    cy.get(home.modalVisible).should('be.visible');
  });

  // Allowed hosts for social/external links
  const allowedHosts = {
    'btn-contact-linkedin': ['linkedin.com', 'www.linkedin.com'],
    'btn-contact-github': ['github.com', 'www.github.com'],
    'btn-contact-whatsapp': ['wa.me', 'api.whatsapp.com'],
  };

  // Reuse the same logic for all external buttons
  ['btn-contact-linkedin', 'btn-contact-github', 'btn-contact-whatsapp'].forEach((id) => {
    it(`External_Links_Should_Open_Correct_Domain (${id})`, () => {
      const hosts = allowedHosts[id];

      // Read href and validate its host
      home.getHref(`#${id}`).then((href) => {
        expect(href, 'href should exist').to.not.be.empty;

        const urlObj = new URL(href);
        const host = urlObj.host.toLowerCase();

        const match = hosts.some((h) => host.includes(h));
        expect(match, `host ${host} should be allowed`).to.eq(true);
      });
    });
  });
});
