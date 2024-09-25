class HomePage {
  //this section is to identify the all constants, ids, values or url used as paramenters for the tests
  URL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
  customerBtn = '.btn.btn-primary.btn-lg:contains("Customer Login")'
  managerBtn = '.btn.btn-primary.btn-lg:contains("Bank Manager Login")'

  visit(){
    cy.visit(this.URL);
  }

  getCustomerButton(){
    return cy.get(this.customerBtn);
  }

  getManagerButton(){
  return cy.get(this.managerBtn);
  }

  customerButtonClick(){
  cy.get(this.customerBtn).click()
  }

  managerButtonClick(){
  cy.get(this.managerBtn).click()
  }
  
  checkUrl(){
    cy.url().should('eq', this.URL)
  }

}

export default HomePage;


