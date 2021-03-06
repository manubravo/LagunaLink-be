Feature: Job Opening
  The next Company step after complete a registry is publish a Job Opening.

  Scenario: Publish a Job Opening
    Given I have a Company Role Account
    And I am logged in the application

    When I send a POST request to "/job_openings" with body:
    """
    {
      "description": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 20K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses",
      "hiringDate": "05-11-2022"
    }
    """
    Then the response status code should be 201

  Scenario: Get an bad request status code when try publish a Job Opening with Student account
    Given I have a Student Role Account
    And I am logged in the application

    When I send a POST request to "/job_openings" with body:
    """
    {
      "description": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 20K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses",
      "hiringDate": "05-11-2022"
    }
    """
    Then the response status code should be 403

  Scenario: Upgrade a Job Opening with new data
    Given I have a Company Role Account
    And I am logged in the application
    And I published a Job Opening with id "ef8ac118-8d7f-49cc-abec-78e0d05af80a"

    When I send a PUT request to "/job_openings/ef8ac118-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "description": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 25K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses",
      "hiringDate": "05-09-2022",
      "isActive": true
    }
    """
    Then the response status code should be 200

  Scenario: Get a not found status code when try update a not exist Job Opening
    Given I have a Company Role Account
    And I am logged in the application

    When I send a PUT request to "/job_openings/ef8ac121-8d7f-49cc-abec-78e0d05af80a" with body:
    """
    {
      "description": "Frontend Developer",
      "position": "Junior Frontend Developer",
      "conditions": "salario 25K anuales",
      "responsibilities": "Desarrollo de interfaz de apliacion web",
      "qualification": "Tecnico Superior en desarrollo de aplicaciones web",
      "prevExperience": "3 meses",
      "hiringDate": "05-07-2022",
      "isActive": true
    }
    """
    Then the response status code should be 404

  Scenario: Get a Job Opening by Id
    Given Previously was created a Job Opening with id "311d5640-07f8-485e-bf39-6b78a057e4a6"
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/job_openings/311d5640-07f8-485e-bf39-6b78a057e4a6"

    Then the response status code should be 200

  Scenario: Get all Job Openings
    Given Several Job Openings were previously created
    And I have a Student Role Account
    And I am logged in the application

    When I send a GET request to "/job_openings"

    Then the response status code should be 200
