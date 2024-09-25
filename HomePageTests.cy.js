import HomePage from './Pages/HomePage';
import CustomerPage from  './Pages/CustomerPage';
import ManagerPage from './Pages/ManagerPage';

describe('Suite of Tests for globalsqa.com Home page', () => {

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
       //TEST1: Verify that Customer Login page redirects to customer selection page when Customer Login button is clicked
    
    it('[POSITIVE] Customer Login click redirects to customer selection page', () => {
    homePage.customerButtonClick()
    customerPage.checkCustomerPageURL()
    })

    //TEST2: Verify that Customer Login page redirects to manager page when Bank Manager Login button is clicked
  it('[POSITIVE] Customer Login click redirects to manager page', () => {
    homePage.managerButtonClick()
    managerPage.checkManagerPageURL()
  })

  //TEST3: Verify that system redirects back to home page when home button is clicked no matter the page
  it('[POSITIVE] Click on Home redirects to Login main page', () => {
    homePage.customerButtonClick()
    customerPage.checkCustomerPageURL()
   
    customerPage.homeButtonClick()
    homePage.checkUrl()

    homePage.managerButtonClick()
    managerPage.checkManagerPageURL()
  
    managerPage.homeButtonClick()
    homePage.checkUrl()

  })

})

})