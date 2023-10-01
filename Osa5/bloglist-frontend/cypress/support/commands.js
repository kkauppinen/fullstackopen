// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('createUser', (user) => {
  cy.request({
    url: 'http://localhost:3003/api/users',
    method: 'POST',
    body: user,
  }).then((res) => {
    expect(res.status, 'User creation status').to.equal(201);
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    body: { username, password },
  }).then((res) => {
    expect(res.status, 'Login status').to.equal(200);
    localStorage.setItem('user', JSON.stringify(res.body));
    cy.visit('/');
  });
});

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }).then((res) => {
    expect(res.status, 'Create blog status').to.equal(201);
    cy.reload();
  });
});
