describe('Проверка работы конструктора', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });
  it('Добавление ингредиентов', function () {
    cy.visit('http://localhost:4000');
    cy.get('[data-cy=constructor_bun_top]')
      .contains('Ингредиент 1. Булочка')
      .should('not.exist');
    cy.get('[data-cy=constructor_bun_bottom]')
      .contains('Ингредиент 1. Булочка')
      .should('not.exist');
    cy.get('[data-cy=constructor_main]')
      .contains('Ингредиент 2. Мясо')
      .should('not.exist');
    cy.get('[data-cy=constructor_main]')
      .contains('Ингредиент 3. Соус')
      .should('not.exist');

    cy.get(`[data-cy=${'bun'}${'1'}]`).contains('Добавить').click();
    cy.get(`[data-cy=${'main'}${'2'}]`).contains('Добавить').click();
    cy.get(`[data-cy=${'sauce'}${'3'}]`).contains('Добавить').click();

    cy.get('[data-cy=constructor_bun_top]')
      .contains('Ингредиент 1. Булочка')
      .should('exist');
    cy.get('[data-cy=constructor_bun_bottom]')
      .contains('Ингредиент 1. Булочка')
      .should('exist');
    cy.get('[data-cy=constructor_main]')
      .contains('Ингредиент 2. Мясо')
      .should('exist');
    cy.get('[data-cy=constructor_main]')
      .contains('Ингредиент 3. Соус')
      .should('exist');
  });
});
