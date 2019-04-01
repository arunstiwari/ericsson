Feature: User Registration

Scenario: User registers successfully
Given a new user with email "arun.tiwari@gmail.com" firstname "Arun" name "Tiwari"
When the user registers
Then a user "arun.tiwari@gmail.com" should exist
And no error should be reported

Scenario: Search User
Given a user with email "arun.tiwari@gmail.com"
When the user searches
Then a user "arun.tiwari@gmail.com" should exist

Scenario: Invalid Email
Given a new user with email "arun.tiwari" firstname "Arun" name "Tiwari" 
When the user registers
Then error with invalid message should be shown

Scenario: Multiple User with same email id would not be registered
Given a new user with email "arun.tiwari@gmail.com" firstname "Arun" name "Tiwari" 
And another user with email "arun.tiwari@gmail.com" firstname "Bill" name "Gates"
When the user registers
And the other user registers
Then the registration of the other user should fail