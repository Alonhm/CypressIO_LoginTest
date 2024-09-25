import HomePage from './Pages/HomePage';
import CustomerPage from  './Pages/CustomerPage';
import ManagerPage from './Pages/ManagerPage';

describe('Suite of Tests for globalsqa.com Manager page', () => {

  //Welcome this is a POC System by using Cypress Io to test login page 
  //In this Javascript class you will find the all positive test scenarios for the system 
  //Those test scenarios will check redirections, existences of elements when some action is invoked
const homePage = new HomePage();
const managerPage = new ManagerPage();
    
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      homePage.visit();
    })

  
    describe('[POSITIVE] Create New Customer', () => {
      beforeEach(() => {
        homePage.managerButtonClick()
        managerPage.addCustomerForPreconditions()
        managerPage.checkAlertContainsExpectedCustomerCreatedMessage()
      })

    //TEST6: Verify that new customer created is displayed in the customers list section 
    it('[POSITIVE] Check new customer created is displayed on the customers list', () => {
    //Aliasing elements
    managerPage.listOfCustomersButtonClick()
    managerPage.checkCustomerIsPresentOnList()
    })

    afterEach(() => {
      managerPage.listOfCustomersButtonClick()
      managerPage.deleteLastCustomerClick()
      })
    
    })

    describe('[POSITIVE] Delete Customer', () => {
      beforeEach(() => {
        homePage.managerButtonClick()
        managerPage.addCustomerForPreconditions()
        managerPage.addCustomerSubmitButtonClick()
      })

    //TEST7: Verify that new customer created is displayed in the customers list section and after delete it disappears
    it('Check new customer created is deleted from on the customers list', () => {
    //Aliasing elements
      managerPage.listOfCustomersButtonClick()
      managerPage.deleteLastCustomerClick()

      managerPage.checkLastCustomerIsNotPresent()
    })
    })

    describe('[POSITIVE] Search Customer', () => {
      beforeEach(() => {
        homePage.managerButtonClick()
        managerPage.addCustomerForPreconditions()
      })

    //TEST8: Verify that new customer created is displayed in the customers list section 
    // and user can search and find it on customers list
    it('Check new customer created is displayed on the customers list and user can search for it', () => {
      //Aliasing elements
      managerPage.listOfCustomersButtonClick()
        managerPage.checkCustomerIsPresentOnList()
        managerPage.fillSearchInput();
       
        managerPage.checkCustomerIsPresentOnList()
        managerPage.deleteLastCustomerClick()
        
        managerPage.fillSearchInput();
        managerPage.checkNoResultsDisplayedOnCustomersList()
      })
    })

    describe('[NEGATIVE] Create Duplicated Customer', () => {
      beforeEach(() => {
        homePage.managerButtonClick()
        managerPage.addCustomerForPreconditions()
      })

    //TEST9: Verify that user is not able to create an existent customer 
    it('Check that user is not able to create an existent customer', () => {
      managerPage.addCustomerButtonClick()
      managerPage.fillFirstNameInput()
      managerPage.fillLastNameInput()
      managerPage.fillPostCodeInput()
      managerPage.addCustomerSubmitButtonClick()

      managerPage.checkAlertContainsExpectedCustomerDuplicatedMessage()
    })

    afterEach(() => {
      managerPage.listOfCustomersButtonClick()
      managerPage.deleteLastCustomerClick()
      })
    
    })
  
    describe('[NEGATIVE] Create New Customer Validations', () => {
    //TEST10: Verify that validations are displayed for non allowed values
    it('Check validations are displayed for empty values on create customer', () => {
      homePage.managerButtonClick()
      managerPage.addCustomerButtonClick()

      managerPage.fillFirstNameInputWithEmpty()
      //check that form validation must be displayed according with element class
      managerPage.checkFirstNameInputHaveInvalidRequiredClass()
      
      managerPage.fillFirstNameInput()
      //check that form validation must not be displayed according with element class
      managerPage.checkFirstNameInputHaveNotValidatedClass()

      managerPage.fillLastNameInputWithEmpty()
      //check that form validation must be displayed according with element class
      managerPage.checkLastNameInputHaveInvalidRequiredClass()

      managerPage.fillLastNameInput()
      //check that form validation must not be displayed according with element class
      managerPage.checkLastNameInputHaveNotValidatedClass()

      managerPage.fillPostCodeInputWithEmpty()
      //check that form validation must be displayed according with element class
      managerPage.checkPostCodeInputHaveInvalidRequiredClass()
      
      managerPage.fillPostCodeInput()
      //check that form validation must not be displayed according with element class
      managerPage.checkPostCodeInputHaveNotValidatedClass()
    })

    })

    describe('[POSITIVE] Open Accounts For New Customer', () => {

      before(() => {
        homePage.visit()
        homePage.managerButtonClick()
        managerPage.addCustomerForPreconditions()
      }) 
       
      
      //TEST11: Check that user is able to open account for new customer all currencies
      it('Check that user is able to open account for new customer for all currencies', () => {
        var customerFullName = managerPage.firstName +' '+managerPage.lastName
        homePage.managerButtonClick()

        managerPage.verifyAddAccountForDolars(customerFullName)
        managerPage.verifyAddAccountForPound(customerFullName)
        managerPage.verifyAddAccountForRupee(customerFullName)
      })

    })

})