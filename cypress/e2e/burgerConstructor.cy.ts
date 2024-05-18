describe('Тест добавления ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.viewport(1920,1080);
    cy.visit('http://localhost:4000')
  });
  it('Добавление булки',()=>{
    cy.get('[data-cy=buns-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Ингредиент 1 (Булка)').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Ингредиент 1 (Булка)').should('exist');
  })
  it('Добавление соуса',()=>{
    cy.get('[data-cy=sauces-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент 4 (Соус)').should('exist');
  })
  it('Добавление начинки',()=>{
    cy.get('[data-cy=mains-category]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]').contains('Ингредиент 2 (Начинка)').should('exist');
  })
});

describe('Тест модального окна ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.viewport(1920,1080);
    cy.visit('http://localhost:4000')
  });
  it('Открытие модального окна ингредиента',()=>{
    cy.contains('Ингредиент 1 (Булка)').click();
    cy.contains('Детали ингредиента').should('exist');
  })
  it('Закрытие модального окна кликом по крестику',()=>{
    cy.contains('Ингредиент 1 (Булка)').click();
    cy.get('[data-cy=modal-close]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })
  it('Закрытие модального окна кликом по оверлею',()=>{
    cy.contains('Ингредиент 1 (Булка)').click();
    cy.get('body').click(0,0);
    cy.contains('Детали ингредиента').should('not.exist');
  })
});
describe('Тест создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'login.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.viewport(1920,1080);
    cy.visit('http://localhost:4000')
  });
  afterEach(()=>{
    cy.clearCookies();
    cy.clearLocalStorage();
  })
  it('Создание заказа',()=>{
    cy.get('[data-cy=buns-category]').contains('Добавить').click();
    cy.get('[data-cy=sauces-category]').contains('Добавить').click();
    cy.get('[data-cy=mains-category]').contains('Добавить').click();
    cy.get('[data-cy=order-burger]').click();
    cy.get('[data-cy=order-number]').contains('123123').should('exist');
    cy.get('[data-cy=modal-close]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('[data-cy=constructor-bun-1]').contains('Выберите булки').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Выберите булки').should('exist');
    cy.get('[data-cy=constructor-ingredients]').contains('Выберите начинку').should('exist');
  })
});
