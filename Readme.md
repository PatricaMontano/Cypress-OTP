# Test Cypress - OTP
### Version de Cypress 
12.5.1
### Librerías Ocupadas adicionales 

- @badeball/cypress-cucumber-preprocessor
- @cypress/webpack-preprocessor
- @testing-library/cypress
- Cypress
- Cypress-iframe
- Ts-loader
- Typescript
- webpack
- axios
- cypress-dotenv
- dotenv
- googleapis

### Precondiciones

- Se usó la opción chromeWebSecurity con la opción false para deshabilitar los errores por Cross origin.
- Obtener las credenciales de API Gmail de la consola de Google y guardarlas en el archivo .env del proyecto
- Tener creada una cuenta con el correo en la plataforma en la cual se va a usar OTP

### OTP
Para hacer uso de inicio de sesión con OTP se decidio extraer el codigo de verificación que llega al correo electronico, para realizar esto se hizo uso del GMAIL APi de Google, lo que nos permitio obetener mediante llamada Rest el correo con la respectiva clave OTP.
![image](https://user-images.githubusercontent.com/51218499/221449603-b5960ac2-62e0-423e-9de7-dbca9edce21f.png)

#### Configuración de GMAIL API Google
Como prerrequisito es necesario tener una cuenta de Google.
1. Creamos un proyecto de google en la consola en [Google Cloud Platform](https://console.cloud.google.com/getting-started) en nuestra cuenta
2. Instalamos al app GMAL API dentro del proyecto
3. ConfiguramosOAuth en el proyecto, seleccionamos uso Externo, agregamos infromación de la aplicación, agreagamos nuestro correo. Guardamos.
4. Configuramos la opción de Credenciales.
5. Creamos las credenciales de OAuth client ID, agregamos los datos correspondiente (seleccionamos Web Aplication, agregamos nombre de aplicación)
6. Agregamos la url https://developers.google.com/oauthplayground en la opción de Authorized redirect URIs, esto debería crear un cliente de OAuth para su proyecto y también debería generar algunas claves útiles de ID de cliente y de secreto de cliente para su proyecto.
7. Aplastamos en la opción Create, nos mostrara la claves de Cliente ID y Cliente Secret
8. Nos dirigimos al sitio web https://developers.google.com/oauthplayground , donde generamos Acces y Refresh Token, permitimos el uso de nuestra cuenta de google.
9. Ejecutamos Exchange Authorization code for tokens
10. Guardamos los tokens de REDIRECT URI y REFRESH TOKEN

Para mas información del proceso visitar https://stateful.com/blog/gmail-api-node-tutorial

#### Configuración de Metodos de Llamada a API GMAIL en Cypress
Para realizar la consulta a la API GMAIL creamos un metodo que obtenga el ultimo email recibido en el correo el cual sera correspondiente a la clave OTP.

El metodo hace uso de axios para ejecutra la consulta y de googleapis para generar un Bearer token, para ello necesitaremos 4 claves previamente obtenidas la cuales guardamos en el archivo .env

- CLIENT_ID
- CLIENT_SECRET
- REDIRECT_URI
- REFRESH_TOKEN

#### Uso de comando task para ejecutar comandos del lado del Servidor
Dado que Cypress ejecuta todo de lado del cliente (Browser) se tuvo que hacer uso del metodo de Cypress **task** el cual ejecuta metodos en el lado del Servidor (Node).

Se definio el metodo creado en el archivo cypress.config.ts con lo cual se pudo hacer uso del metodo de consulta en la rutina normal de ejecución de Cypress.

Para hacer uso del metodo se dede llamar desde el test
```sh
cy.task("Nombre del metodo creado")
```
### Leer Correo de Confirmación
Para leer el correo de confirmación se hizo uso de API de GMAIL
![image](https://user-images.githubusercontent.com/51218499/221749059-101aee76-0693-4e4c-8a5e-12c000a0c207.png)
### Errores en Consulta
En el caso que no se encuentre los correos correspondientes de OTP o Confirmación de Compra se lanzara una **excepción** que interrumpira el flujo de Cypress

### Caso de Prueba - Producción

Para demostrar la funcionalidad se hizo el siguiente caso de uso:

```
Feature: Compra con efectivo en KFC Ecuador
    Scenario: Compra exitosa
        When Ingreso a la plataforma "https://www.kfc.com.ec/"
        And selecciono el producto deseado
        Then realizara el pago con efectivo de manera exitosa
```

![image](https://user-images.githubusercontent.com/51218499/221449540-81a3a7ae-fa3a-4d71-b27f-7116fc80bcad.png)
En el cual se llego hasta el ultimo punto antes de la compra para no ocasionar inconvenientes a la tienda 


### Caso de Prueba Mobile - Producción

Se realizo una prueba en modo **Mobile**  el flujo llego un punto antes de realizar la compra para no causar inconvenientes a la tienda en donde se realiza la prueba

```
Scenario: Compra exitosa
        Given Entrar en mobile en "https://www.kfc.com.ec/"
        When Seleccionar el producto deseado
        Then Realizar el pago con efectivo de manera exitosa
```
![image](https://user-images.githubusercontent.com/51218499/221748833-6e27277e-6eb9-4a54-b795-512a61d1cdc1.png)
### Caso de Prueba - Stagging
Se hizo un caso se prueba en Stagging KFC Ecuador donde se termino el flujo termina hasta finalizar la compra y recibir el correo de Confirmación.
```
Scenario: Compra exitosa en stagging
        Given Ingreso a la plataforma "https://staging-kfc-ec.deuna.io/" e 
        introduzco mi dirección
        When selecciono el producto a comprar
        And ingreso a mi cuenta de DEUNA
        Then realizo el pago con efectivo de manera exitosa
```


## Ejecución
Para ejecutar el proyecto ejecute los siguientes comandos:

```sh
npm install
npm run cypress:open
```

