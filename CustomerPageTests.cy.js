import HomePage from './Pages/HomePage';
import CustomerPage from  './Pages/CustomerPage';
import ManagerPage from './Pages/ManagerPage';

describe('Suite of Tests for globalsqa.com Customer page', () => {

  //Welcome this is a POC System by using Cypress Io to test login page 
  //In this Javascript class you will find the all positive test scenarios for the system 
  //Those test scenarios will check redirections, existences of elements when some action is invoked
const homePage = new HomePage();
const customerPage = new CustomerPage();
const managerPage = new ManagerPage();
 
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      homePage.visit();
    })

describe('General Tests', () => {
      
    //TEST4: Verify that Login button is not displayed if user select the default placeholder option on customer selector
  it('[POSITIVE] Check selecting default placeholder on list, system does not displays the Login button', () => {
    homePage.customerButtonClick()
    customerPage.checkLoginButtonIsHidden()
  })

  //TEST5: Verify that Login button not displayed if user select the any option on customer selector except default one
  it('[POSITIVE] Check selecting other elements on list, system displays the Login button', () => {
    homePage.customerButtonClick()
    customerPage.checkLoginButtonIsPresentForOtherCustomers()
  })

})

describe('Customer Login Tests', () => {
  var customerFullName = managerPage.firstName +' '+managerPage.lastName;

  describe('[POSITIVE] Welcome page for new customer with accounts', () => {

    function createCustomerForLogin (){ 
      homePage.managerButtonClick()
      managerPage.addCustomerForPreconditions()
    }

    function getAllAccountsForCustomer (){
      managerPage.getAllAccountsForCustomer();
    }

    function addAccountForDolars(customerfullname){
     managerPage.addAccountForDolars(customerfullname);
    }

    function addAccountForPound(customerfullname){
      managerPage.addAccountForPound(customerfullname);
    }

    function addAccountForRupee(customerfullname){
      managerPage.addAccountForRupee(customerfullname);
    }

    beforeEach(() => {
      homePage.visit()
      createCustomerForLogin()
      addAccountForDolars(customerFullName)
      addAccountForPound(customerFullName)
      addAccountForRupee(customerFullName)
      getAllAccountsForCustomer();
    }) 
     
    //TEST12: Check that user is able to login and go to the welcome page and all accounts are correctly displayed
    it('Check that user is able to login, go to the welcome page and all accounts are correctly displayed', () => {
      managerPage.homeButtonClick()
      homePage.customerButtonClick()

      customerPage.selectCustomer(customerFullName)      
      customerPage.loginButtonClick()
      customerPage.checkLogedInCustomerAndAccountsData(customerFullName)
    })

    //TEST13: Check that logout button is not there untill login
    it('Check that logout button is not there untill login', () => {
      managerPage.homeButtonClick()
      homePage.customerButtonClick()

      customerPage.selectCustomer(customerFullName)      
      customerPage.loginButtonClick()

      customerPage.checkCustomerHeader(customerFullName)
      customerPage.checkLogoutButtonExists()
    })

    //TEST14: Check that user is able to logout and go to customer selection
     it('Check that user is able to logout and go to customer selection', () => {
      managerPage.homeButtonClick()
      homePage.customerButtonClick()

      customerPage.selectCustomer(customerFullName)      
      customerPage.loginButtonClick()

      customerPage.checkCustomerHeader(customerFullName)
      customerPage.checkLogoutButtonExists()

      customerPage.logoutButtonClick()
      customerPage.checkCustomerPageURL()       
    })

   
  })
})

})