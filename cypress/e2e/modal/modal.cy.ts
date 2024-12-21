describe('Тестирование работы модальных окон', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  it('Открытие модального окна при клике на ингредиент', function () {
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get(`[data-cy=${'bun'}${'1'}]`)
      .contains('Ингредиент 1. Булочка')
      .click();
    cy.get('[data-cy=modal]').contains('Ингредиент 1. Булочка').should('exist');
  });

  it('Закрытие модального окна при клике на иконку', function () {
    cy.get(`[data-cy=${'bun'}${'1'}]`)
      .contains('Ингредиент 1. Булочка')
      .click();
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', function () {
    cy.get(`[data-cy=${'bun'}${'1'}]`)
      .contains('Ингредиент 1. Булочка')
      .click();
    cy.get('[data-cy=modal]').should('exist');
    cy.get('[data-cy=overlay]')
      .should('exist')
      .click('topRight', { force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});
