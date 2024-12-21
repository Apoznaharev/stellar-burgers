describe('Тестирование заказа', function () {
  this.beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000');
  });
  afterEach(function () {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
  it('Оформление заказа и очистка конструктора', function () {
    cy.get(`[data-cy=${'bun'}${'1'}]`).contains('Добавить').click();
    cy.get(`[data-cy=${'main'}${'2'}]`).contains('Добавить').click();
    cy.get('[data-cy=order_button]')
      .contains('Оформить заказ')
      .should('exist')
      .click();
    cy.get('[data-cy=order_number]').contains('4785').should('exist');
    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=constructor]').should(
      'not.contain',
      'Ингредиент 1. Булочка'
    );
    cy.get('[data-cy=constructor]').should('not.contain', 'Ингредиент 2. Мясо');
  });
});
