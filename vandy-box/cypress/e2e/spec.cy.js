
describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/profile/richardli')
  })
  it('loads UserData', () => {
    cy.get('#handle').should('have.text', '@richardli')
  })
})