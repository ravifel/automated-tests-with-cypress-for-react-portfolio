export class TestimonialsPage {
  // ===== Locators =====
  navbarTestimonials = '#link-testimonials';
  pageTitle = '#testimonials-title';

  linkedinBtn = '#btn-linkedin-testimonials';

  sortSelect = '#testimonials-sort-filter-select';
  resultsPerPageSelect = '.pagination-select__control';

  testimonialCardsList = '#testimonials-list .testimonial-card';
  testimonialCardsPage1 = '#testimonial-card-1-0';
  testimonialCardsPage2 = '#testimonial-card-2-0';
  seeMoreLinks = '#testimonial-card-1-0-see-more-btn';

  modal = '.modal-content';
  modalSeeMoreBtn = '#testimonial-card-1-0-see-more-btn';
  modalCloseBtn = '.btn-close';

  nextBtn = '#testimonials-pagination-next';
  backBtn = '#testimonials-pagination-prev';

  // ===== Actions =====

  open() {
    cy.visit('/');
    cy.get(this.navbarTestimonials).click();
    cy.contains('#link-testimonials', /testimonials|recomenda[cç][oõ]es/i).click();
  }

  title() {
    return cy.url().should('include', '/testimonials');
  }

  openFirstTestimonialModal() {
    cy.contains(this.modalSeeMoreBtn, 'See more').first().click();
    cy.get(this.modal).should('be.visible');
  }

  closeModal() {
    cy.get(this.modalCloseBtn).click();
    cy.get(this.modal).should('not.exist');
  }

  selectSort(optionText) {
    cy.get(this.sortSelect).select(optionText);
  }

  selectResultsPerPage(value) {
    cy.get(this.resultsPerPageSelect).should('be.visible').click();
    cy.contains('.pagination-select__option', value.toString()).click();
  }

  goNextPage() {
    cy.get(this.nextBtn).click();
  }

  goBackPage() {
    cy.get(this.backBtn).click();
  }

  getVisibleCards(numberPage) {
    if (numberPage == 1) {
      return cy.get(this.testimonialCardsPage1);
    } else if (numberPage == 2) {
      return cy.get(this.testimonialCardsPage2);
    }
  }

  getAllVisibleCards() {
    return cy.get(this.testimonialCardsList);
  }

  getLinkedInHref() {
    return cy.get(this.linkedinBtn).invoke('attr', 'href');
  }
}
