Feature: Company Registry
  The next step after of create a new account is complete
  the registry of a company account.

  Scenario: Register a Company account
    Given I am logged in with previous created Company Role account
    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 201

  Scenario: Get an bad request error when try register a Company with Student account
    Given I am logged in with previous created Student Role account
    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 400

  Scenario: Get an bad request error when try register a Company previously registered
    Given I am logged in with a Company Role account previously registered
    When I send a POST request with Auth header to "/companies" with body:
    """
    {
      "name": "La sureña",
      "description": "Somos uno de los bares mas concurridos del mundo",
      "address": "Sal si puedes 8",
      "postalCode": 45001,
      "region": "Madrid",
      "city": "Madrid"
    }
    """
    Then the response status code should be 400

  Scenario: Upgrade a company with new data
    Given I am logged in with previous created Company Role account
    When I send a PUT request with Auth header to "/companies" with body:
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