Feature: Compra con efectivo dispositivo mobile en KFC Ecuador
    Compra exitosa por parte de un cliente de KFC Ecuador

    Scenario: Compra exitosa
        Given Entrar en mobile en "https://www.kfc.com.ec/"
        When Seleccionar el producto deseado
        Then Realizar el pago con efectivo de manera exitosa