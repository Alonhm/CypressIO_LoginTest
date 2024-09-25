import HomePage from "./HomePage";

class ManagerPage {
  //this section is to identify the all constants, ids, values or url used as paramenters for the tests

   //this section is to identify some expected values to check
  expectedBankManagerPageUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager'
  homeBtn = '.btn.home'
  addCustomerBtn = '.btn.btn-lg.tab:contains("Add Customer")'
  firstNameInput = 'input[placeholder*="First Name"]'
  lastNameInput = 'input[placeholder*="Last Name"]'
  postCodeInput = 'input[placeholder*="Post Code"]'
  addCustomerSubmitBtn = '.btn.btn-default'
  addCustomerAccountBtn = '.btn.btn-lg.tab'
  listOfCustomersBtn = '.btn.btn-lg.tab:contains("Customers")'
  customersTable = '.table.table-bordered.table-striped'
  searchCustomerInput = 'input[placeholder*="Search Customer"]'
  accountProcessBtn = 'button[type]'
  userSelect = '#userSelect'
  currencySelect = '#currency'

  expectedCustomerDuplicatedAlert = 'Please check the details. Customer may be duplicate.'
  expectedCustomerCreatedAlert = 'Customer added successfully with customer id :'
  expectedCustomerAccountCreatedAlert = 'Account created successfully with account Number :'

  //this section is for new customer values to send
  firstName = "Luis Alonso"
  lastName = "Hernandez Monge"
  postCode = "30108"
  customerFullName = this.firstName +' '+this.lastName

  listOfAccounts = []
  listOfCurrenciesOrdered = []
    
  checkManagerPageURL(){
    cy.url().should('eq', this.expectedBankManagerPageUrl)
  }

  getHomeButton(){
    return cy.get(this.homeBtn);
  }

  homeButtonClick(){
    cy.get(this.homeBtn).click()
  }

  addCustomerButtonClick(){
    cy.get(this.addCustomerBtn).click()
  }

  fillFirstNameInput(){
    cy.get(this.firstNameInput).type(this.firstName)
  }

  fillFirstNameInputWithEmpty(){
     var emptyValue = ' '
     cy.get(this.firstNameInput).type(emptyValue)
  }

  fillLastNameInput(){
    cy.get(this.lastNameInput).type(this.lastName)
  }

  fillLastNameInputWithEmpty(){
    var emptyValue = ' '
    cy.get(this.lastNameInput).type(emptyValue)
  }

  fillPostCodeInput(){
    cy.get(this.postCodeInput).type(this.postCode)
  }

  fillPostCodeInputWithEmpty(){
    var emptyValue = ' '
    cy.get(this.postCodeInput).type(emptyValue)
  }

  addCustomerSubmitButtonClick(){
    cy.get(this.addCustomerSubmitBtn).click()
  }
  
  checkAlertContainsExpectedCustomerCreatedMessage(){
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains(this.expectedCustomerCreatedAlert);
   })
  }

  listOfCustomersButtonClick(){
    cy.get(this.listOfCustomersBtn).click()
  }
 
  checkCustomerIsPresentOnList(){
    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').first().as('lastCustomerFirstName')
    cy.get('@lastCustomerFirstName').should('have.text', this.firstName)

    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').eq(1).as('lastCustomerLastName')
    cy.get('@lastCustomerLastName').should('have.text', this.lastName)

    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').eq(2).as('lastCustomerPostCode')
    cy.get('@lastCustomerPostCode').should('have.text', this.postCode)
  } 

  deleteLastCustomerClick(){
    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').eq(4).find('button').as('deleteCustomer')

    //deleting testing data
    cy.get('@deleteCustomer').click()
  }

  checkLastCustomerIsNotPresent(){
    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').first().as('lastCustomerFirstName')
    cy.get('@lastCustomerFirstName').should('not.have.text', this.firstName)
  }

  addCustomerForPreconditions(){
  this.addCustomerButtonClick()
  this.fillFirstNameInput()
  this.fillLastNameInput()
  this.fillPostCodeInput()
  this.addCustomerSubmitButtonClick()
  }

  fillSearchInput(){
    cy.get(this.searchCustomerInput).type(this.firstName)
  }
 
  checkNoResultsDisplayedOnCustomersList(){
    cy.get(this.customersTable).find('tbody>tr').should('not.exist')
  }

  checkAlertContainsExpectedCustomerDuplicatedMessage(){
    cy.on('window:alert',(t)=>{
      //assertions
      expect(t).to.contains(this.expectedCustomerDuplicatedAlert);
   })
  }
  
  checkFirstNameInputHaveInvalidRequiredClass(){
    cy.get(this.firstNameInput).should('have.class', 'ng-invalid')
    cy.get(this.firstNameInput).should('have.class', 'ng-invalid-required')
  }

  checkFirstNameInputHaveNotValidatedClass(){
    cy.get(this.firstNameInput).should('not.have.class', 'ng-invalid')
    cy.get(this.firstNameInput).should('not.have.class', 'ng-invalid-required')
  }

  checkLastNameInputHaveInvalidRequiredClass(){
    cy.get(this.lastNameInput).should('have.class', 'ng-invalid')
    cy.get(this.lastNameInput).should('have.class', 'ng-invalid-required')
  }

  checkLastNameInputHaveNotValidatedClass(){
    cy.get(this.lastNameInput).should('not.have.class', 'ng-invalid')
    cy.get(this.lastNameInput).should('not.have.class', 'ng-invalid-required')
  }

  checkPostCodeInputHaveInvalidRequiredClass(){
    cy.get(this.postCodeInput).should('have.class', 'ng-invalid')
    cy.get(this.postCodeInput).should('have.class', 'ng-invalid-required')
  }

  checkPostCodeInputHaveNotValidatedClass(){
    cy.get(this.postCodeInput).should('not.have.class', 'ng-invalid')
    cy.get(this.postCodeInput).should('not.have.class', 'ng-invalid-required')
  }

  checkAccountIdOnCustomersList (newvalue){
    //get the index of the start of the part of the URL we want to keep
    var indexOfTwoPoints  = newvalue.indexOf(':')
    //then get everything after the found index
    var newAccountId = newvalue.substr(indexOfTwoPoints+1)

    cy.get(this.listOfCustomersBtn).click() 
     cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').eq(3).find('span').contains(newAccountId).should('exist')
  }

 verifyAddAccountForDolars(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Dollar')
    cy.get(this.accountProcessBtn).click()

    let newValue = '';

    cy.on('window:alert', (t) => {
      // assertions
      newValue = t;
      expect(t).to.contains(this.expectedCustomerAccountCreatedAlert);
    });
    
    cy.wrap(null).then(() => {
      // Now newValue will have been set
      this.checkAccountIdOnCustomersList(newValue)
    });
  }

   verifyAddAccountForPound(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Pound')
    cy.get(this.accountProcessBtn).click()

    let newValue = '';

    cy.on('window:alert', (t) => {
      // assertions
      newValue = t;
      expect(t).to.contains(this.expectedCustomerAccountCreatedAlert);
    });
    
    cy.wrap(null).then(() => {
      // Now newValue will have been set
      this.checkAccountIdOnCustomersList(newValue)
    });
  }

   verifyAddAccountForRupee(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Rupee')
    cy.get(this.accountProcessBtn).click()

    let newValue = '';

    cy.on('window:alert', (t) => {
      // assertions
      newValue = t;
      expect(t).to.contains(this.expectedCustomerAccountCreatedAlert);
    });
    
    cy.wrap(null).then(() => {
      // Now newValue will have been set
      this.checkAccountIdOnCustomersList(newValue)
    });
  }

  getAllAccountsForCustomer (){
    cy.get(this.listOfCustomersBtn).click() 
    cy.get(this.customersTable).find('tbody>tr')
    .last().find('td').eq(3).find('span').each(($span) => {
       this.listOfAccounts.push($span.text().trim())
    })
  }

   addAccountForDolars(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Dollar')
    cy.get(this.accountProcessBtn).click()
    this.listOfCurrenciesOrdered.push('Dollar')
  }

   addAccountForPound(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Pound')
    cy.get(this.accountProcessBtn).click()
    this.listOfCurrenciesOrdered.push('Pound')
  }

   addAccountForRupee(customerfullname){
    cy.get(this.addCustomerAccountBtn).eq(1).click()

    cy.get(this.userSelect).select(customerfullname)
    cy.get(this.currencySelect).select('Rupee')
    cy.get(this.accountProcessBtn).click()
    this.listOfCurrenciesOrdered.push('Rupee')
  }
  
}

export default ManagerPage;


