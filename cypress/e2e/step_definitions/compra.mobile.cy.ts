import {Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';


Given('Entrar en mobile en {string}', () => {
    cy.viewport(Cypress.env('WIDTH'),Cypress.env('HEIGHT'));
    cy.visit(Cypress.env('KFC_BASE_URL'));
    cy.wait(3000);
    cy.get('#redirect-close > path').click({force: true});

});

When('Seleccionar el producto deseado', () => {

    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })
    cy.wait(3000);
    cy.get('li:nth-child(1) span').click({force:true});  
    cy.wait(5000)
    cy.url().should('contains',Cypress.env('KFC_BASE_URL')+"menu");
    cy.get('.nav-item:nth-child(8) .rounded-circle').click({force:true});
    cy.wait(4000);
    cy.get('.col-md-12:nth-child(1) #product_812 .product-component-image').click({force:true});

    cy.wait(5000);
    cy.get('#original-o-crispy-crispy').click();
    cy.get('#elige-el-sabor-de-tus-bebidas-fresa').click();
    cy.get('.d-flex:nth-child(4) .quantity-select-related-product-increase').click();
    cy.get('[name="options[additional_information]"]').type('Prueba hecha por Johanna Montaño');
    cy.get('.button__text').click();
    cy.get('#add-to-cart-form').click({force:true});
    cy.wait(4000);

});

Then('Realizar el pago con efectivo de manera exitosa', () => {

    cy.get('.d-none > .spree-icon').click({force:true});
    cy.wait(4000);
    cy.url().should('contains', Cypress.env('KFC_BASE_URL')+'cart');
    cy.get('.d-flex > #button-checkout-duna').click({force:true});

    cy.wait(40000);
    cy.iframe('.zoid-visible')
    .findByLabelText('Correo Electrónico*')
    .should('be.visible')
    .type(Cypress.env('EMAIL'));

    cy.wait(13000);
    cy.iframe('.zoid-visible')
    .findByText('Enviar código al correo')
    .should('be.visible')
    .click();

    cy.wait(25000);
    cy.task("getEmail").then((result:any) => {
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-0"]').type(result.charAt(0))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-1"]').type(result.charAt(1))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-2"]').type(result.charAt(2))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-3"]').type(result.charAt(3))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-4"]').type(result.charAt(4))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-5"]').type(result.charAt(5))
    });
    cy.wait(9000);
    
    cy.iframe('.zoid-visible').findByText('Efectivo').should('be.visible').click({ force: true });
    cy.iframe('.zoid-visible').findByLabelText('Solicitar cambio de').should('exist').type('10');
    
    
});

