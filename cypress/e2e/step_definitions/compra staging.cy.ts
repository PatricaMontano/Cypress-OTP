import { Given , Then, When } from '@badeball/cypress-cucumber-preprocessor';


Given('Ingreso a la plataforma {string} e introduzco mi dirección', () => {
    cy.viewport(1038,660);
    cy.visit(Cypress.env('KFC_STAGING_URL'));
    cy.wait(1000);
    cy.get('.mobile-cookie-btn').click({force:true});
    cy.get('#shipping_type_delivery_desktop').click({force:true});
    cy.get('.delivery-address-input > #address_input').type('El Bosque, Quito, Ecuador').focus();
    cy.get('.delivery-address-input > #address_input').click({force:true});
    cy.wait(1000);
    cy.get('.delivery-address-input > #address_input').focus();
    cy.wait(3000);
    cy.get('.pac-item-query').first().click();
    cy.wait(4000);
    cy.get('.confirm-delivery-desktop-btn > .button__text').click({force:true});
    cy.wait(3000);
});

When('selecciono el producto a comprar', () => {

    cy.on('uncaught:exception', (err, runnable) => {
        return false
    })

    cy.get('li:nth-child(1) span').click({force:true});
    cy.wait(5000);
    cy.url().should('contains', Cypress.env('KFC_STAGING_URL')+'menu');
    cy.get('.nav-item:nth-child(4) .rounded-circle').click({force:true});
    cy.wait(4000);
    cy.get('#product_2454 .product-component-image').click({force:true});
    cy.wait(4000);
    cy.get('#original-o-crispy-crispy').click();
    cy.get('#elige-el-sabor-de-tus-bebidas-fresa').click();
    cy.get('.d-flex:nth-child(4) .quantity-select-related-product-increase').click();
    cy.get('#options_additional_information').type('Prueba hecha por Johanna Montaño');
    cy.get('#add-to-cart-button > .button__text').click();
    cy.get('#add-to-cart-form').click({force:true});
    cy.wait(4000);
    

});

When('ingreso a mi cuenta de DEUNA', () => {

    cy.get('.d-none > .font-weight-medium').click({force:true});
    cy.wait(4000);
    cy.url().should('contains',Cypress.env('KFC_STAGING_URL')+'cart');
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
    cy.task("readOTP").then((result:any) => {
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-0"]').type(result.charAt(0))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-1"]').type(result.charAt(1))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-2"]').type(result.charAt(2))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-3"]').type(result.charAt(3))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-4"]').type(result.charAt(4))
        cy.iframe('.zoid-visible').find('[data-testid="test-otp-5"]').type(result.charAt(5))
    });
    cy.wait(9000);
    
});

Then('realizo el pago con efectivo de manera exitosa', () => {
    cy.iframe('.zoid-visible').findByText('Efectivo').should('be.visible').click({ force: true });
    cy.iframe('.zoid-visible').findByLabelText('Solicitar cambio de').should('exist').type('20');
    cy.iframe('.zoid-visible').findByText('Pagar USD 11.72').should('be.visible').click();

    cy.wait(15000);
    cy.iframe('.zoid-visible').findByText('Tu orden se ha procesado con éxito').should('be.visible');
    
    cy.wait(65000);
    
    cy.task("readEmailConfirmation").then((result:any) => {
        cy.iframe('.zoid-visible').find('.css-1sccu6l').should("have.text",result);

    });

});