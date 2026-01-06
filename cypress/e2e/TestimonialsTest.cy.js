import { TestimonialsPage } from '../pages/TestimonialsPage';

describe('Testimonials Page - End to End Tests', () => {
  const testimonialsPage = new TestimonialsPage();

  beforeEach(() => {
    testimonialsPage.open();
  });

  it('Should_Display_Testimonials_Page_Correctly', () => {
    cy.contains('h2', 'Testimonials').should('be.visible');
  });

  it('Should_Render_At_Least_One_Testimonial_Card', () => {
    testimonialsPage.getVisibleCards(1).should('exist').and('have.length.greaterThan', 0);
  });

  it('Should_Open_And_Close_Testimonial_Modal_When_Clicking_See_More', () => {
    testimonialsPage.openFirstTestimonialModal();
    testimonialsPage.closeModal();
  });

  it('Should_Sort_Testimonials_By_Oldest', () => {
    testimonialsPage.selectSort('Oldest');
    testimonialsPage.getVisibleCards(1).should('exist');
  });

  it('Should_Sort_Testimonials_By_Most_Recent', () => {
    testimonialsPage.selectSort('Most recent');
    testimonialsPage.getVisibleCards(1).should('exist');
  });

  it('Should_Change_To_6_Results_Per_Page', () => {
    testimonialsPage.selectResultsPerPage(6);
    testimonialsPage.getVisibleCards(1).should('have.length.at.most', 6);
  });

    it('Should_Change_To_12_Results_Per_Page', () => {
    testimonialsPage.selectResultsPerPage(12);
    testimonialsPage.getVisibleCards(1).should('have.length.at.most', 12);
  });

  it('Should_Navigate_To_Next_And_Back_Page', () => {
    testimonialsPage.goNextPage();
    testimonialsPage.getVisibleCards(2).should('exist');

    testimonialsPage.goBackPage();
    testimonialsPage.getVisibleCards(1).should('exist');
  });

  it('LinkedIn_Button_Should_Have_Valid_Link', () => {
    testimonialsPage.getLinkedInHref().then((href) => {
      expect(href).to.not.be.empty;

      const url = new URL(href);
      expect(url.host).to.include('linkedin.com');
    });
  });
});
