@bdd @smoke
Feature: Playwright documentation navigation
  As a test automation engineer
  I want to open the Playwright documentation from the home page
  So that I can validate a business-readable journey with Playwright BDD

  Scenario: Open documentation from the home page
    Given I am on the Playwright home page
    When I open the getting started documentation
    Then I should see the documentation page
