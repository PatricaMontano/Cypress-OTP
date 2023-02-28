Feature: Compra con efectivo en KFC Ecuador con usuario DEUNA 
    Compra exitosa en Stagging KFC Ecuador

    Scenario: Compra exitosa en stagging
        Given Ingreso a la plataforma "https://staging-kfc-ec.deuna.io/" e introduzco mi dirección
        When selecciono el producto a comprar
        And ingreso a mi cuenta de DEUNA
        Then realizo el pago con efectivo de manera exitosa