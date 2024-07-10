Case 1 Pagination testing:
Should add all test cases inside a description and just a new test case for each page? 
Example: customerPagination.cy.js - I added 2 test cases to check the following:
* The response status is 200 (OK).
* The response body contains a customers array with a length of 5.
* Each customer in the response matches the expected customer data.
* The pageInfo in the response matches the expected pagination details.

Note: I provided just two examples, but I'm not sure if this is the best way to test API pagination. If a user selects 20 customers per page, should this be included in the same description, or should we create a separate file to test it independently?

I have created a new file to test pagination with 20 customers per page. However, 

