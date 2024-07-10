import rules from "../fixtures/axe-rules.json";
const severityIndicators = {
    minor: "⚪",
    moderate: "🟡",
    serious: "🟠",
    critical: "🔴",
};

function callback(violations) {
    let countMinor = 0;
    let countModerate = 0;
    let countSerious = 0;
    let countCritical = 0;
    let countWcagFail = 0;
    let countBestPracticeFail = 0;

    if (violations.length > 0) {
        Cypress.log({ name: "🚨 VIOLAÇÕES ENCONTRADAS", message: "" });
    }
  
    violations.forEach((violation) => {
      if (violation.impact === "minor") countMinor = countMinor + 1;
      if (violation.impact === "moderate") countModerate = countModerate + 1;
      if (violation.impact === "serious") countSerious = countSerious + 1;
      if (violation.impact === "critical") countCritical = countCritical + 1;
  
      const rule = rules.filter((r) => r.id === violation.id);
      let ruleDescription = "";
      if (rule[0] !== null) {
        ruleDescription = rule[0].descriptionTranslated;
        if (rule[0].category === "wcag") countWcagFail = countWcagFail + 1;
        if (rule[0].category === "best-practice")
          countBestPracticeFail = countBestPracticeFail + 1;
      } else {
        ruleDescription = violation.help;
      }
  
      Cypress.log({
        name: `${severityIndicators[violation.impact]} ${violation.id}`,
        message: `[${ruleDescription}](${violation.helpUrl})`,
      });
  
      Cypress.log({
        name: "HTML",
        message: JSON.stringify(violation.nodes[0].html),
      });
    });
  
    Cypress.log({ name: "🚨 IMPACTO E CRITICIDADE", message: "" });
    Cypress.log({ name: "Crítico:", message: countCritical });
    Cypress.log({ name: "Sério:", message: countSerious });
    Cypress.log({ name: "Moderado:", message: countModerate });
    Cypress.log({ name: "Menor:", message: countMinor });
  
    Cypress.log({ name: "🚨 CATEGORIA DOS ERROS", message: "" });
    Cypress.log({ name: "Erros referentes a WCAG:", message: countWcagFail });
    Cypress.log({
      name: "Erros de boas práticas:",
      message: countBestPracticeFail,
    });
  
    Cypress.log({ name: "----------------------------", message: "" });
  }
  
  Cypress.Commands.add("pageAccessibility", () => {
    cy.injectAxe();
  
    [[1920, 1080], "macbook-11", "iphone-6", "ipad-mini"].forEach((size) => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
      cy.checkA11y(null, {}, callback);
    });
  });
  
  Cypress.Commands.add("componentAccessibility", (selector) => {
    /*
      O parâmetro selector é um seletor CSS do elemento que irá ser testado.
      O mesmo pode ser id, class ou combinações. Ex: #container-ava > .home > .continue-onde-parou
    */
    cy.injectAxe();
    cy.checkA11y(selector, {}, callback);
  });
  