import HomePage from "./HomePage";

class CustomerPage {
  //this section is to identify the all constants, ids, values or url used as paramenters for the tests

   //this section is to identify some expected values to check
  expectedCustomerPageUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer'
  homeBtn = '.btn.home'
  loginBtnHidden = '.btn.btn-default.ng-hide:contains("Login")'
  loginBtn = '.btn.btn-default:contains("Login")'
  userSelect = '#userSelect'
  currencySelect = '#currency'
  customernameHeader = '.fontBig.ng-binding'
  accountNumberHeader = '.ng-binding'
  accountSelect = '#accountSelect'
  logoutBtn = '.btn.logout'

  //this section is for new customer values to send
  firstName = "Luis Alonso"
  lastName = "Hernandez Monge"
  postCode = "30108"

   listOfAccounts = []
   listOfCurrenciesOrdered = []
   

  checkCustomerPageURL(){
    cy.url().should('eq', this.expectedCustomerPageUrl)
  }

  getHomeButton(){
    return cy.get(this.homeBtn)
  }

  homeButtonClick(){
    cy.get(this.homeBtn).click()
  }
  
  checkLoginButtonIsHidden(){
  cy.get(this.userSelect).first()
  cy.get(this.loginBtnHidden).should('exist')
  }

  checkLoginButtonIsPresentForOtherCustomers(){
    cy.get('option').each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      if ($el.index() != 0) {
        cy.get(this.loginBtn).should('exist') //login button exists
      }
    })
  }

  selectCustomer(customerFullName){
  cy.get(this.userSelect).select(customerFullName)  
  }
      
  loginButtonClick(){
    cy.get(this.loginBtn).click();
  }

  checkLogedInCustomerAndAccountsData(customerFullName){
    cy.get(this.customernameHeader).contains(customerFullName).should('exist')
    cy.get(this.accountSelect).should('exist')
    
    for (const accountId of this.listOfAccounts) {
      cy.get(this.accountSelect).find('option').contains(accountId.toString()).should('exist')
      cy.get(this.accountSelect).select(accountId.toString())
      cy.get(this.accountNumberHeader).eq(1).contains(accountId.toString()).should('exist')

      if(this.listOfAccounts.indexOf(accountId) == 0){
        cy.get(this.accountNumberHeader).eq(3).contains(this.listOfCurrenciesOrdered[0]).should('exist')
      }
      if(this.listOfAccounts.indexOf(accountId) == 1){
        cy.get(this.accountNumberHeader).eq(3).contains(this.listOfCurrenciesOrdered[1]).should('exist')
      }
      if(this.listOfAccounts.indexOf(accountId) == 2){
        cy.get(this.accountNumberHeader).eq(3).contains(this.listOfCurrenciesOrdered[2]).should('exist')
      }

    } 
  }

  checkCustomerHeader(customerFullName){
    cy.get(this.customernameHeader).contains(customerFullName).should('exist')
  }
 
  checkLogoutButtonExists(){
    cy.get(this.logoutBtn).should('exist')
  }
      
  logoutButtonClick(){
    cy.get(this.logoutBtn).click();
  }
}
export default CustomerPage;


