Feature: Compra con efectivo en KFC Ecuador
    Compra exitosa por parte de un cliente de KFC Ecuador

    Scenario: Compra exitosa
        When Ingreso a la plataforma "https://www.kfc.com.ec/"
        And seleccione el producto deseado
        Then realizara el pago con efectivo de manera exitosa