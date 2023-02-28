const axios = require("axios");
const { google } = require("googleapis");

const generateConfig = (url, accessToken) => {
  return {
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};


async function readLastMessage() {

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  
  const url = `https://gmail.googleapis.com/gmail/v1/users/${process.env.CYPRESS_EMAIL}/messages`;
  const { token } = await oAuth2Client.getAccessToken();
  const config = generateConfig(url, token);
  const response = await axios(config);
  let data = await response.data;

  const urlMessage = `https://gmail.googleapis.com/gmail/v1/users/${process.env.CYPRESS_EMAIL}/messages/${data.messages[0].id}`;
  const configMessage = generateConfig(urlMessage, token);
  const responseMessage = await axios(configMessage);
  const dataMessage = await responseMessage.data;
  return dataMessage;
}


export async function readMailOTP() {
  const lastMessage = await readLastMessage();
  
  if(!lastMessage.snippet.includes("Verifica tu identidad",0)){
    throw new Error('OTP no encontrado en la cuenta '+process.env.CYPRESS_EMAIL);
  }

  const dataMessage = await lastMessage.snippet;
  const otp = dataMessage.split(" ")[17];
  return otp;
}




export async function readMailConfirmation() {
  const lastMessage = await readLastMessage();

  if(!lastMessage.snippet.includes("Resumen de la compra",0)){
    throw new Error('No se encuentra el correo de Confirmación del pedido en la cuenta '+process.env.CYPRESS_EMAIL);
  }

  const dataMessage = await lastMessage.payload.headers[17].value;
  const orderID = dataMessage.split("#")[1];
  return orderID;
}
