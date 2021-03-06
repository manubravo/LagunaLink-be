Feature: Company
  The companies account features

  Scenario: Upgrade a company with new data
    Given I have a Company Role Account with id "60c72c72-00d0-4231-adb1-1be01c6a4e13"
    And I am logged in the application

    When I send a PUT request to "/companies/60c72c72-00d0-4231-adb1-1be01c6a4e13" with body:
    """
    {
      "name": "La Sureña",
      "description": "Somos el bar mas concurrido del mundo",
      "address": "Sal si puedes, 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 200

  Scenario: Obtain a Company data from Student account
    Given Previously was registered a company with id "4062df16-b864-4d90-969c-5fbd1220a179"
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/companies/4062df16-b864-4d90-969c-5fbd1220a179"

    Then the response status code should be 200

  Scenario: Get all Companies
    Given Several Companies were previously created
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/companies"

    Then the response status code should be 200
