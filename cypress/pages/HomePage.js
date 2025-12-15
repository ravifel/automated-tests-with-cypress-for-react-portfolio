// Page Object for the Home page.
// Keeps selectors and common actions in one place to make tests cleaner.

class HomePage {
  // ===== Locators =====
  navbarBrand = '#navbar-brand';
  navbarHome = '#link-home';
  navbarRepositories = '#link-repositories';
  navbarTestimonials = '#link-testimonials';
  themeToggleBtn = '#toggle-theme-btn';
  languageSelect = '#language-select';

  btnCoverLetter = '#btn-cover-letter-en';
  btnResumeEn = '#btn-resume-en';
  btnContactEmail = '#btn-contact-email';
  btnContactWhatsapp = '#btn-contact-whatsapp';
  btnContactLinkedin = '#btn-contact-linkedin';
  btnContactGitHub = '#btn-contact-github';

  inputName = '#input-name';
  inputEmail = '#input-email';
  inputMessage = '#input-message';
  btnSend = '#btn-contact-send';
  btnCloseModal = "button[aria-label='Close']";

  modalVisible = 'div.modal.show';

  // ===== Actions / Workflows =====

  open() {
    cy.visit('/');
  }

  click(selector) {
    cy.get(selector)
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .click({ force: true });
  }

  fill(selector, value) {
    cy.get(selector).should('be.visible').clear().type(value);
  }

  selectLanguage(text) {
    cy.get(this.languageSelect).select(text);
  }

  toggleTheme() {
    this.click(this.themeToggleBtn);
  }

  // Snapshot of theme-related UI state (similar to Selenium)
  getThemeUiState() {
    const state = {};

    cy.get(this.themeToggleBtn).then(($btn) => {
      state.text = $btn.text().trim();
      state.class = $btn.attr('class') || '';
    });

    // Grab effective background color from body (good enough proxy here)
    cy.get('body').then(($body) => {
      state.bg = getComputedStyle($body[0]).backgroundColor;
    });

    return cy.wrap(state);
  }

  submitEmptyContactForm() {
    this.click(this.btnContactEmail);
    this.click(this.btnSend);
  }

  submitInvalidContactForm() {
    this.click(this.btnContactEmail);
    this.fill(this.inputName, 'Name Test');
    this.fill(this.inputEmail, 'email-invalid');
    this.fill(this.inputMessage, 'Invalid test message.');
    this.click(this.btnSend);
  }

  submitValidContactForm() {
    this.click(this.btnContactEmail);
    this.fill(this.inputName, 'Name Test');
    this.fill(this.inputEmail, 'email.test@example.com.br');
    this.fill(this.inputMessage, 'Valid test message.');
    this.click(this.btnSend);
  }

  getHref(selector) {
    return cy.get(selector).invoke('attr', 'href');
  }
}

export default HomePage;
