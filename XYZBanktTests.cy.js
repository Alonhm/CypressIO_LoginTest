describe('Suite of Tests for globalsqa.com login page', () => {

  //Welcome this is a POC System by using Cypress Io to test login page 
  //In this Javascript class you will find the all positive test scenarios for the system 
  //Those test scenarios will check redirections, existences of elements when some action is invoked
  //Checking cliks, checking that new records are created correctly and assertions for those new records.

  //this section is to identify the all constants, ids, values or url used as paramenters for the tests
    const URL = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
    const customerBtn = '.btn.btn-primary.btn-lg:contains("Customer Login")'
    const managerBtn = '.btn.btn-primary.btn-lg:contains("Bank Manager Login")'
    const homeBtn = '.btn.home'
    const loginBtnHidden = '.btn.btn-default.ng-hide:contains("Login")'
    const loginBtn = '.btn.btn-default:contains("Login")'
    const userSelect = '#userSelect'
    const accountSelect = '#accountSelect'
    const logoutBtn = '.btn.logout'
    const addCustomerBtn = '.btn.btn-lg.tab:contains("Add Customer")'
    const firstNameInput = 'input[placeholder*="First Name"]'
    const lastNameInput = 'input[placeholder*="Last Name"]'
    const postCodeInput = 'input[placeholder*="Post Code"]'
    const addCustomerSubmitBtn = '.btn.btn-default'
    const addCustomerAccountBtn = '.btn.btn-lg.tab'
    const listOfCustomersBtn = '.btn.btn-lg.tab:contains("Customers")'
    const customersTable = '.table.table-bordered.table-striped'
    const searchCustomerInput = 'input[placeholder*="Search Customer"]'
    const accountProcessBtn = 'button[type]'
    const currencySelect = '#currency'
    const customernameHeader = '.fontBig.ng-binding'
    const accountNumberHeader = '.ng-binding'
    const listOfAccounts = []
    const listOfCurrenciesOrdered = []

    //this section is to identify some expected values to check
    const expectedCustomerPageUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer'
    const expectedBankManagerPageUrl = 'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager'
    const expectedCustomerDuplicatedAlert = 'Please check the details. Customer may be duplicate.'
    const expectedCustomerCreatedAlert = 'Customer added successfully with customer id :'
    const expectedCustomerAccountCreatedAlert = 'Account created successfully with account Number :'

    //this section is for new customer values to send
    var firstName = "Luis Alonso"
    var lastName = "Hernandez Monge"
    var postCode = "30108"
    var customerFullName = firstName +' '+lastName
    
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit(URL)
    })

    describe('General Tests', () => {
       //TEST1: Verify that Customer Login page redirects to customer selection page when Customer Login button is clicked
    it('[POSITIVE] Customer Login click redirects to customer selection page', () => {
      cy.get(customerBtn).click()
      cy.url().should('eq', expectedCustomerPageUrl)
  })

  //TEST2: Verify that Customer Login page redirects to manager page when Bank Manager Login button is clicked
  it('[POSITIVE] Customer Login click redirects to manager page', () => {
    cy.get(managerBtn).click()
    cy.url().should('eq', expectedBankManagerPageUrl)
  })

  //TEST3: Verify that system redirects back to home page when home button is clicked no matter the page
  it('[POSITIVE] Click on Home redirects to Login main page', () => {
    cy.get(customerBtn).click()
    cy.url().should('eq', expectedCustomerPageUrl)
   
    cy.get(homeBtn).click()
    cy.url().should('eq', URL)

    cy.get(managerBtn).click()
    cy.url().should('eq', expectedBankManagerPageUrl)
  
    cy.get(homeBtn).click()
    cy.url().should('eq', URL)

  })

  //TEST4: Verify that Login button is not displayed if user select the default placeholder option on customer selector
  it('[POSITIVE] Check selecting default placeholder on list, system does not displays the Login button', () => {
    cy.get(customerBtn).click()
    cy.get(userSelect).first()
    cy.get(loginBtnHidden).should('exist') //hidden button exists
  })

  //TEST5: Verify that Login button not displayed if user select the any option on customer selector except default one
  it('[POSITIVE] Check selecting other elements on list, system displays the Login button', () => {
    cy.get(customerBtn).click()
    cy.get('option').each(($el, index, $list) => {
      // $el is a wrapped jQuery element
      if ($el.index() != 0) {
        cy.get(loginBtn).should('exist') //login button exists
      }
    })
  })

    })

    describe('Bank Manager Login Tests', () => {
    
    describe('[POSITIVE] Create New Customer', () => {
      beforeEach(() => {
        cy.get(managerBtn).click()
        cy.get(addCustomerBtn).click()
  
        cy.get(firstNameInput).type(firstName)
        cy.get(lastNameInput).type(lastName)
        cy.get(postCodeInput).type(postCode)
  
        cy.get(addCustomerSubmitBtn).click()

        cy.on('window:alert',(t)=>{
          //assertions
          expect(t).to.contains(expectedCustomerCreatedAlert);
       })
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      })

    //TEST6: Verify that new customer created is displayed in the customers list section 
    it('[POSITIVE] Check new customer created is displayed on the customers list', () => {
    //Aliasing elements
      cy.get(listOfCustomersBtn).click()
      cy.get(customersTable).find('tbody>tr')
      .last().find('td').first().as('lastCustomerFirstName')

      cy.get('@lastCustomerFirstName').should('have.text', firstName)

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(1).as('lastCustomerLastName')

      cy.get('@lastCustomerLastName').should('have.text', lastName)

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(2).as('lastCustomerPostCode')

      cy.get('@lastCustomerPostCode').should('have.text', postCode)
    })

    afterEach(() => {
      cy.get(listOfCustomersBtn).click()
      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(4).find('button').as('deleteCustomer')

      //deleting testing data
      cy.get('@deleteCustomer').click()
      })
    
    })

    describe('[POSITIVE] Delete Customer', () => {
      beforeEach(() => {
        cy.get(managerBtn).click()
        cy.get(addCustomerBtn).click()
  
        cy.get(firstNameInput).type(firstName)
        cy.get(lastNameInput).type(lastName)
        cy.get(postCodeInput).type(postCode)
  
        cy.get(addCustomerSubmitBtn).click()
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      })

    //TEST7: Verify that new customer created is displayed in the customers list section and after delete it disappears
    it('Check new customer created is deleted from on the customers list', () => {
    //Aliasing elements
      cy.get(listOfCustomersBtn).click()
      cy.get(customersTable).find('tbody>tr')
      .last().find('td').first().as('lastCustomerFirstName')
      cy.get('@lastCustomerFirstName').should('have.text', firstName)

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(1).as('lastCustomerLastName')
      cy.get('@lastCustomerLastName').should('have.text', lastName)

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(2).as('lastCustomerPostCode')
      cy.get('@lastCustomerPostCode').should('have.text', postCode)

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(4).find('button').as('deleteCustomer')

      //deleting testing data
      cy.get('@deleteCustomer').click()

      cy.get(customersTable).find('tbody>tr')
      .last().find('td').first().as('lastCustomerFirstName')
      cy.get('@lastCustomerFirstName').should('not.have.text', firstName)

    })
    })

    describe('[POSITIVE] Search Customer', () => {
      beforeEach(() => {
        cy.get(managerBtn).click()
        cy.get(addCustomerBtn).click()
  
        cy.get(firstNameInput).type(firstName)
        cy.get(lastNameInput).type(lastName)
        cy.get(postCodeInput).type(postCode)
  
        cy.get(addCustomerSubmitBtn).click()
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      })

    //TEST8: Verify that new customer created is displayed in the customers list section 
    // and user can search and find it on customers list
    it('Check new customer created is displayed on the customers list and user can search for it', () => {
      //Aliasing elements
        cy.get(listOfCustomersBtn).click()
        cy.get(customersTable).find('tbody>tr')
        .last().find('td').first().as('lastCustomerFirstName')
  
        cy.get('@lastCustomerFirstName').should('have.text', firstName)
  
        cy.get(customersTable).find('tbody>tr')
        .last().find('td').eq(1).as('lastCustomerLastName')
  
        cy.get('@lastCustomerLastName').should('have.text', lastName)
  
        cy.get(customersTable).find('tbody>tr')
        .last().find('td').eq(2).as('lastCustomerPostCode')
  
        cy.get('@lastCustomerPostCode').should('have.text', postCode)

        cy.get(searchCustomerInput).type(firstName)

        cy.get(customersTable).find('tbody>tr')
        .last().find('td').first().as('lastCustomerFirstName')
  
        cy.get('@lastCustomerFirstName').should('have.text', firstName)

        cy.get(customersTable).find('tbody>tr')
        .last().find('td').eq(4).find('button').as('deleteCustomer')
  
        //deleting testing data
        cy.get('@deleteCustomer').click()
        
        cy.get(searchCustomerInput).clear().type(firstName)

        cy.get(customersTable).find('tbody>tr').should('not.exist')
      })
    })

    describe('[NEGATIVE] Create Duplicated Customer', () => {
      beforeEach(() => {
        cy.get(managerBtn).click()
        cy.get(addCustomerBtn).click()
  
        cy.get(firstNameInput).type(firstName)
        cy.get(lastNameInput).type(lastName)
        cy.get(postCodeInput).type(postCode)
  
        cy.get(addCustomerSubmitBtn).click()
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      })

    //TEST9: Verify that user is not able to create an existent customer 
    it('Check that user is not able to create an existent customer', () => {
      cy.get(addCustomerBtn).click()

      cy.get(firstNameInput).type(firstName)
      cy.get(lastNameInput).type(lastName)
      cy.get(postCodeInput).type(postCode)

      cy.get(addCustomerSubmitBtn).click()

      cy.on('window:alert',(t)=>{
        //assertions
        expect(t).to.contains(expectedCustomerDuplicatedAlert);
     })
    })

    afterEach(() => {
      cy.get(listOfCustomersBtn).click()
      cy.get(customersTable).find('tbody>tr')
      .last().find('td').eq(4).find('button').as('deleteCustomer')

      //deleting testing data
      cy.get('@deleteCustomer').click()
      })
    
    })
  
    describe('[NEGATIVE] Create New Customer Validations', () => {
    //TEST10: Verify that validations are displayed for non allowed values
    it('Check validations are displayed for empty values on create customer', () => {
      cy.get(managerBtn).click()
      cy.get(addCustomerBtn).click()

      var emptyValue = ' '

      cy.get(firstNameInput).type(emptyValue)
      //check that form validation must be displayed according with element class
      cy.get(firstNameInput).should('have.class', 'ng-invalid')
      cy.get(firstNameInput).should('have.class', 'ng-invalid-required')
      
      cy.get(firstNameInput).type(firstName)
      //check that form validation must not be displayed according with element class
      cy.get(firstNameInput).should('not.have.class', 'ng-invalid')
      cy.get(firstNameInput).should('not.have.class', 'ng-invalid-required')

      cy.get(lastNameInput).type(emptyValue)
      //check that form validation must be displayed according with element class
      cy.get(lastNameInput).should('have.class', 'ng-invalid')
      cy.get(lastNameInput).should('have.class', 'ng-invalid-required')
      
      cy.get(lastNameInput).type(lastName)
      //check that form validation must not be displayed according with element class
      cy.get(lastNameInput).should('not.have.class', 'ng-invalid')
      cy.get(lastNameInput).should('not.have.class', 'ng-invalid-required')

      cy.get(postCodeInput).type(emptyValue)
      //check that form validation must be displayed according with element class
      cy.get(postCodeInput).should('have.class', 'ng-invalid')
      cy.get(postCodeInput).should('have.class', 'ng-invalid-required')
      
      cy.get(postCodeInput).type(postCode)
      //check that form validation must not be displayed according with element class
      cy.get(postCodeInput).should('not.have.class', 'ng-invalid')
      cy.get(postCodeInput).should('not.have.class', 'ng-invalid-required')

    })
    })

    describe('[POSITIVE] Open Accounts For New Customer', () => {

      function createCustomer (){ 
        cy.get(managerBtn).click()
        cy.get(addCustomerBtn).click()
  
        cy.get(firstNameInput).type(firstName)
        cy.get(lastNameInput).type(lastName)
        cy.get(postCodeInput).type(postCode)
  
        cy.get(addCustomerSubmitBtn).click()
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      }

      before(() => {
        cy.visit(URL)
        createCustomer()
       //Here we have on improvement to do: system needs confirmation message for action and notification
      //go to the customers list
      }) 
       
      function checkAccountIdOnCustomersList (newvalue){
        //get the index of the start of the part of the URL we want to keep
        var indexOfTwoPoints  = newvalue.indexOf(':')
        //then get everything after the found index
        var newAccountId = newvalue.substr(indexOfTwoPoints+1)

        cy.get(listOfCustomersBtn).click() 
         cy.get(customersTable).find('tbody>tr')
        .last().find('td').eq(3).find('span').contains(newAccountId).should('exist')
      }
  
      function verifyAddAccountForDolars(customerfullname){
        cy.get(addCustomerAccountBtn).eq(1).click()

        cy.get(userSelect).select(customerfullname)
        cy.get(currencySelect).select('Dollar')
        cy.get(accountProcessBtn).click()

        let newValue = '';

        cy.on('window:alert', (t) => {
          // assertions
          newValue = t;
          expect(t).to.contains(expectedCustomerAccountCreatedAlert);
        });
        
        cy.wrap(null).then(() => {
          // Now newValue will have been set
          checkAccountIdOnCustomersList(newValue)
        });
      }

      function verifyAddAccountForPound(customerfullname){
        cy.get(addCustomerAccountBtn).eq(1).click()

        cy.get(userSelect).select(customerfullname)
        cy.get(currencySelect).select('Pound')
        cy.get(accountProcessBtn).click()

        let newValue = '';

        cy.on('window:alert', (t) => {
          // assertions
          newValue = t;
          expect(t).to.contains(expectedCustomerAccountCreatedAlert);
        });
        
        cy.wrap(null).then(() => {
          // Now newValue will have been set
          checkAccountIdOnCustomersList(newValue)
        });
      }

      function verifyAddAccountForRupee(customerfullname){
        cy.get(addCustomerAccountBtn).eq(1).click()

        cy.get(userSelect).select(customerfullname)
        cy.get(currencySelect).select('Pound')
        cy.get(accountProcessBtn).click()

        let newValue = '';

        cy.on('window:alert', (t) => {
          // assertions
          newValue = t;
          expect(t).to.contains(expectedCustomerAccountCreatedAlert);
        });
        
        cy.wrap(null).then(() => {
          // Now newValue will have been set
          checkAccountIdOnCustomersList(newValue)
        });
      }

      //TEST11: Check that user is able to open account for new customer all currencies
      it('Check that user is able to open account for new customer for all currencies', () => {
        var customerFullName = firstName +' '+lastName
        cy.get(managerBtn).click()
        verifyAddAccountForDolars(customerFullName)
        verifyAddAccountForPound(customerFullName)
        verifyAddAccountForRupee(customerFullName)
      })

    })
      
    })

    describe('Customer Login Tests', () => {

      describe('[POSITIVE] Welcome page for new customer with accounts', () => {

        function createCustomerForLogin (){ 
          cy.get(managerBtn).click()
          cy.get(addCustomerBtn).click()
    
          cy.get(firstNameInput).type(firstName)
          cy.get(lastNameInput).type(lastName)
          cy.get(postCodeInput).type(postCode)
    
          cy.get(addCustomerSubmitBtn).click()
         //Here we have on improvement to do: system needs confirmation message for action and notification
        //go to the customers list
        }

        function getAllAccountsForCustomer (){
          cy.get(listOfCustomersBtn).click() 
          cy.get(customersTable).find('tbody>tr')
          .last().find('td').eq(3).find('span').each(($span) => {
             listOfAccounts.push($span.text().trim())
          })
        }
    
        function addAccountForDolars(customerfullname){
          cy.get(addCustomerAccountBtn).eq(1).click()
  
          cy.get(userSelect).select(customerfullname,)
          cy.get(currencySelect).select('Dollar')
          cy.get(accountProcessBtn).click()
          listOfCurrenciesOrdered.push('Dollar')
        }
  
        function addAccountForPound(customerfullname){
          cy.get(addCustomerAccountBtn).eq(1).click()
  
          cy.get(userSelect).select(customerfullname,)
          cy.get(currencySelect).select('Pound')
          cy.get(accountProcessBtn).click()
          listOfCurrenciesOrdered.push('Pound')
        }
  
        function addAccountForRupee(customerfullname){
          cy.get(addCustomerAccountBtn).eq(1).click()
  
          cy.get(userSelect).select(customerfullname,)
          cy.get(currencySelect).select('Rupee')
          cy.get(accountProcessBtn).click()
          listOfCurrenciesOrdered.push('Rupee')
        }
  
        beforeEach(() => {
          cy.visit(URL)
          createCustomerForLogin()
          addAccountForDolars(customerFullName)
          addAccountForPound(customerFullName)
          addAccountForRupee(customerFullName)
          getAllAccountsForCustomer();
        }) 
         
        //TEST12: Check that user is able to login and go to the welcome page and all accounts are correctly displayed
        it('Check that user is able to login, go to the welcome page and all accounts are correctly displayed', () => {
          cy.get(homeBtn).click()
          cy.get(customerBtn).click()
          cy.get(userSelect).select(customerFullName)       
          cy.get(loginBtn).click();
          cy.get(customernameHeader).contains(customerFullName).should('exist')
          cy.get(accountSelect).should('exist')
          
          for (const accountId of listOfAccounts) {
            cy.get(accountSelect).find('option').contains(accountId.toString()).should('exist')
            cy.get(accountSelect).select(accountId.toString())
            cy.get(accountNumberHeader).eq(1).contains(accountId.toString()).should('exist')

            if(listOfAccounts.indexOf(accountId) == 0){
              cy.get(accountNumberHeader).eq(3).contains(listOfCurrenciesOrdered[0]).should('exist')
            }
            if(listOfAccounts.indexOf(accountId) == 1){
              cy.get(accountNumberHeader).eq(3).contains(listOfCurrenciesOrdered[1]).should('exist')
            }
            if(listOfAccounts.indexOf(accountId) == 2){
              cy.get(accountNumberHeader).eq(3).contains(listOfCurrenciesOrdered[2]).should('exist')
            }

          } 
        })

        //TEST13: Check that logout button is not there untill login
        it('Check that logout button is not there untill login', () => {
          cy.get(homeBtn).click()
          cy.get(customerBtn).click()
          cy.get(userSelect).select(customerFullName)  
          cy.contains(logoutBtn).should('not.exist')
          cy.get(loginBtn).click();
          cy.get(customernameHeader).contains(customerFullName).should('exist')
          cy.get(logoutBtn).should('exist')
        })

        //TEST14: Check that user is able to logout and go to customer selection
         it('Check that user is able to logout and go to customer selection', () => {
          cy.get(homeBtn).click()
          cy.get(customerBtn).click()
          cy.get(userSelect).select(customerFullName)  
          cy.get(loginBtn).click();
          cy.get(customernameHeader).contains(customerFullName).should('exist')
          cy.get(logoutBtn).click();
          cy.url().should('eq', expectedCustomerPageUrl)         
        })
  
      })
    })

  })