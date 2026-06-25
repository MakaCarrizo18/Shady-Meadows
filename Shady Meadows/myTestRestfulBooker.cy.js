
const casos = [ //Defino variables a reutilizar, no creo llegar a desarrollar commands
  {
    nombre: 'Home - valida título',
    nombre2:'search dispo',
    nombre3: 'search dispo + select double rooms',
    nombre4: 'Reserva completa',
    nombre5: 'Validaciones del formulario de reserva ',
    nombre6: 'Formulario de contacto',
    url: 'https://automationintesting.online/',
    assertText: 'Check Availability & Book Your Stay',
    assertText2: 'Our Rooms',
    assertText3: 'Double',
    assertText4: 'Booking Confirmed',
    assertText5: 'Send Us a Message',
    //assertText6: 'Thanks for getting in touch Makarena Carrizo!',

  },
];

describe('Home de la pagina', () => {
  casos.forEach((caso) => {
    it(caso.nombre, () => {
      cy.on('uncaught:exception', (err) => {
        if (err.message && err.message.includes('Minified React error #418')) return false; //utilizo esta excepción por un render
      });

      cy.visit(caso.url);
      cy.contains(caso.assertText, { timeout: 20000 }).should('be.visible');
    });

    it(caso.nombre2, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

       cy.visit(caso.url);
       cy.contains(caso.assertText, { timeout: 20000 }).should('be.visible');
       cy.get('input.form-control', { timeout: 20000 }).should('have.length.at.least', 2);
       cy.get('input.form-control').eq(0).clear().type('24/07/2026');
       cy.get('input.form-control').eq(1).clear().type('28/07/2026');
       cy.get('.col-8 .btn', { timeout: 20000 }).click();
     });

    it(caso.nombre3, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

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

     });

    it(caso.nombre4, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

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
       cy.get('[name="firstname"]').type('Makarena');
       cy.get('[name="lastname"]').type('Carrizo');
       cy.get('[name="email"]').type('maka.carrizo18@gmail.com');
       cy.get('[name="phone"]').type('5493812143103');
       cy.get('.btn-primary',{ timeout: 20000 }).click();
       cy.contains(caso.assertText4, { timeout: 20000 }).should('be.visible');
     });

    it(caso.nombre5, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

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
     });

    it(caso.nombre6, () => {
       cy.on('uncaught:exception', (err) => {
         if (err.message && err.message.includes('Minified React error #418')) return false;
    });

       cy.visit(caso.url);
       cy.contains(caso.assertText5, { timeout: 20000 }).should('be.visible');
       cy.get('[data-testid="ContactName"]').type('Makarena');
       cy.get('[data-testid="ContactEmail"]').type('maka.carrizo18@gmail.com');
       cy.get('[data-testid="ContactPhone"]').type('5493812143103');
       cy.get('[data-testid="ContactSubject"]').type('summer vacations');
       cy.get('[data-testid="ContactDescription"]').type('Te cuento que actualmente estoy esquizofrenica y necesito vacaciones.');
       cy.get('.d-grid > .btn').click();
       cy.get('.col-lg-8 > .card > .card-body', { timeout: 20000 }).should('be.visible');
     });

    })

  });

