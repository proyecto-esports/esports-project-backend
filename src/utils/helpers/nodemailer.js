import nodemailer from 'nodemailer';


// const mail_rover = () => {
//   const oauth2Client = new OAuth2(
//     transporter.auth.clientId,
//     transporter.auth.clientSecret,
//     'hhtps://developers.google.com/oauthplayground'
//   );
//   oauth2Client.setCredentials({
//     refresh_token: transporter.auth.refreshToken,
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   oauth2Client.getAccessToken((error, token) => {
//     if (error) return console.log(error);
//     transporter.auth.accesToken = token;
//   });
// };

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

export default transporter;
