const BASE_URL_API = Cypress.env(
    `BASEURLAPI_${Cypress.env("LOCAL") ? "LOCAL" : "STAGING"}`
  );
  const BASE_URL = Cypress.env(
    `BASEURL_${Cypress.env("LOCAL") ? "LOCAL" : "STAGING"}`
  );
  


  describe("Page EditPage", function () {
    beforeEach(() => {
      cy.token();
      cy.login();
    });

    it("it should display areaProduit product", function () {

        
    }

});