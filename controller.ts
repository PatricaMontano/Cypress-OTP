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


export async function readMail() {

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
  const dataMessage = await responseMessage.data.snippet;

  //Get Number OTP
  const dataArray = dataMessage.split(" ")[17];
  return dataArray;
}
