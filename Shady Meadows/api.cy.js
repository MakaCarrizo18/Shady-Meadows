//Estos ejemplos incluyen validaciones de APIs
const casos = [
  {
    nombre: 'Home - valida título',
    nombre3: 'search dispo + select double rooms',
    nombre5: 'Validaciones del formulario de reserva ',
    url: 'https://automationintesting.online/',
    assertText: 'Check Availability & Book Your Stay',
    assertText2: 'Our Rooms',
    assertText3: 'Double',

  },
];

describe('Home de la pagina', () => {
  casos.forEach((caso) => {
    it(caso.nombre, () => {
      cy.on('uncaught:exception', (err) => {
        if (err.message && err.message.includes('Minified React error #418')) return false;
      });
      cy.intercept('GET', '/api/branding').as('home')
      cy.visit(caso.url);
      cy.contains(caso.assertText, { timeout: 20000 }).should('be.visible');
      
      cy.wait('@home').then((interception)=> {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.contact).to.have.property('email', 'fake@fakeemail.com')
        cy.log('API OK')
    
      })
    });

    it(caso.nombre3, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });
       cy.intercept('GET', '/api/branding').as('home')
       cy.intercept('GET', '/api/report/room/2').as('room')
       cy.visit(caso.url);
       cy.contains(caso.assertText, { timeout: 20000 }).should('be.visible');
       cy.get('input.form-control', { timeout: 20000 }).should('have.length.at.least', 2);
       cy.get('input.form-control').eq(0).clear().type('24/07/2026');
       cy.get('input.form-control').eq(1).clear().type('28/07/2026');
       cy.get('.col-8 .btn', { timeout: 20000 }).click();
       cy.contains(caso.assertText2, { timeout: 20000 }).should('be.visible');
       cy.contains(caso.assertText3, { timeout: 20000 }).should('be.visible');
       cy.get(':nth-child(2) > .card > .card-footer > .btn', { timeout: 20000 }).click();
       cy.contains(caso.assertText3, { timeout: 20000 }).should('be.visible');

       cy.wait('@home').then((interception)=> {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.contact).to.have.property('email','fake@fakeemail.com')
        cy.log('API OK HOME')
     })

        cy.wait('@room').then((interception)=> {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.report[0]).to.have.property('title','Unavailable')
        cy.log('API OK ROOM')
     })
    
     });


    it(caso.nombre5, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

       cy.intercept('GET', '/api/branding').as('home')
       cy.intercept('GET', '/api/report/room/2').as('room')
       cy.intercept('POST', '/api/booking').as('booking')

       cy.visit(caso.url);
       cy.contains(caso.assertText, { timeout: 20000 }).should('be.visible');
       cy.get('input.form-control', { timeout: 20000 }).should('have.length.at.least', 2);
       cy.get('input.form-control').eq(0).clear().type('24/07/2026');
       cy.get('input.form-control').eq(1).clear().type('28/07/2026');
       cy.get('.col-8 .btn', { timeout: 20000 }).click();
       cy.contains(caso.assertText2, { timeout: 20000 }).should('be.visible');
       cy.contains(caso.assertText3, { timeout: 20000 }).should('be.visible');
       cy.get(':nth-child(2) > .card > .card-footer > .btn', { timeout: 20000 }).click();
       cy.contains(caso.assertText3, { timeout: 20000 }).should('be.visible');
       cy.get('#doReservation', { timeout: 20000 }).click();
       cy.get('.btn-primary',{ timeout: 20000 }).click();
       cy.get('.alert', { timeout: 20000 }).should('be.visible');

        cy.wait('@home').then((interception)=> {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.contact).to.have.property('email','fake@fakeemail.com')
        cy.log('API OK HOME')
     })

        cy.wait('@room').then((interception)=> {
        expect(interception.response.statusCode).to.equal(200)
        expect(interception.response.body.report[0]).to.have.property('title','Unavailable')
        cy.log('API OK ROOM')
     })

        cy.wait('@booking').then((interception)=> {
        expect(interception.response.statusCode).to.equal(400)
        cy.log('API OK BOOKING')
     })

     });


    })

  });

