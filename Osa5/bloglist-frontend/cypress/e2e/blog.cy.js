describe('Blog app', function () {
  const user = {
    name: 'Simon',
    username: 'theCat',
    password: 'password',
  };
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser(user);
    cy.visit('/');
  });

  it('Login form is shown', function () {
    cy.contains('Login to application');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.contains('button', 'Login').click();

      cy.get('.success').should('contain', `Welcome ${user.username}`);
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username);
      cy.get('#password').type('test123');
      cy.contains('button', 'Login').click();

      cy.get('.error').should('contain', 'Incorrect username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user.username, user.password);
      cy.createBlog({
        author: 'Gleb Bahmutov',
        title: 'Retry Or Not',
        url: 'glebbahmutov.com',
      });
    });

    it('A blog can be created', function () {
      cy.contains('button', 'Add blog').click();
      cy.get('#author').type('Uncle Bob');
      cy.get('#title').type('SOLID Principles');
      cy.get('#url').type('example.com');
      cy.contains('button', 'Submit').click();

      cy.contains('h2', 'blogs')
        .siblings()
        .should('contain', 'SOLID Principles Uncle Bob');
    });

    it('can like blogs', function () {
      cy.contains('button', 'View').click();
      cy.contains('button', 'Like!').as('likeButton');
      cy.get('@likeButton')
        .siblings()
        .first()
        .invoke('text')
        .then((currentLikes) => {
          cy.get('@likeButton').click();
          cy.get('@likeButton')
            .siblings()
            .should('contain', Number(currentLikes) + 1);
        });
    });

    it('user can remove blog he added', () => {
      cy.contains('button', 'View').click();
      cy.contains('button', 'Remove').click();

      cy.contains('.success', 'Blog is successfully removed');
    });

    it('user cannot see remove button for blogs he did not add', () => {
      cy.createUser({
        name: 'Terttu',
        username: 'Torttu',
        password: 'password',
      });
      cy.login('Torttu', 'password');

      cy.contains('button', 'View').click();
      cy.contains('Retry Or Not').should('not.contain', 'Remove');
    });

    it.only('shows the most liked blog first', () => {
      cy.createBlog({
        author: 'Gleb Bahmutov',
        title: 'Most liked',
        url: 'glebbahmutov.com',
      });

      cy.get('.blog')
        .last()
        .should('contain', 'Most liked')
        .contains('button', 'View')
        .click();
      cy.contains('button', 'Like!').click();

      cy.reload();
      cy.get('.blog').first().should('contain', 'Most liked');
    });
  });
});
