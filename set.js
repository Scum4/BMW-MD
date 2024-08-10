const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0M5aEQxVTA1cHllOWlTVXJrRHZKVHV0azBnSDlBVEgyQ05GQkxJYzVYOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ21DTVN5UkQxbXl6QVc1YlBOcTU3bDFDcm1LaExDV2x5MDh6bW5nNk8zQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyRUVvVHZ5ZGVGTUZtNVh5Q25sZDV4MGczaHZVN1JnYklaeSt2OUdUdVhnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5djNvVytTVW0rd2NHQyt0WStBK0V5QWN2d3hMM0toTnB5d0xES2dXSkFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFV20vYjE0SEo3M0xCMWo5R3dZbWVwTTB0WHM2Y3F5YUVTY0swZEt2bkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN4UUtISmRsSHV0MVpUcGU2Qm1JN2l1R25BUmhtNThvZkJrYkI2ZjFoMU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFjdGlHRExzdFJUSzR5QlJIM2E2cXpMamtqS1ZYVzRObGtiRlpzVW4yND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNKMWI4MFhTN01oL3E4V21UdHJ4eWtwMmZUd0gxb1hSLytTRDhOZFFScz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5DclZaT1puQkdRTy9HcTMySWZ1eUVVOVdSazI5WkFYU3daczNWZUJrUUMxZXVZYkVUVHJNa1Mrd3dQc0ZzZnN2VGMySGQxeW9jS2dyYVg1bHBYbWhnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkzLCJhZHZTZWNyZXRLZXkiOiJ1MTNjZTJYcXdCVUFabGl0K2hUcmp3bkhubk04ZG9jU2lKNGZlSitvUFZRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ5WHpBcXBIdVIweWgzYll0RHZZQ2xRIiwicGhvbmVJZCI6ImJjMGI0NGJkLWIzNjUtNGNhMC05OGEyLTFiMzk1N2EwMTE1MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQjcrdGpBNzdKWGRrVGdVTEp0b0JRekRLRmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVIydTM5RjRyK3VaL3NYTUIxM3hpY1VmWHZRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IktMTEg2OE1YIiwibWUiOnsiaWQiOiIyNTQ3Mjg1MTE3NDQ6NThAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lQZHBMWUhFSW1kM2JVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNtR0xhUzJYV1VMNVVHT3RseWRwS2dPR3pBUi9INkR4VDhIcXI3dEJ5U009IiwiYWNjb3VudFNpZ25hdHVyZSI6Inl5M3d3TFBTZUhPSUdkRjBxOWhnRlJVbnRIbnFiQVVILzhXWjRybzE5TzJMYnBnQW1zVHhCMTN0WDlLWVNlS2tMUXhzYTNsOGJjSEpqTUdKRHZvb0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1UklDdTBqb3JTdHlpZU9sdVRBM3dPMnlNY29INnRrRVFrVjA1NVFYZjYyYUZCUDg5Skd0NnM3ME5WSys0Wk5uaWlrRENjYkxXTHkrdUVUS2ZWK0hnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcyODUxMTc0NDo1OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVcGhpMmt0bDFsQytWQmpyWmNuYVNvRGhzd0VmeCtnOFUvQjZxKzdRY2tqIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMjg5MjM5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxCSyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Kenny Giant",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254728511744,254728511744",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'KENBEAST_MD,
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "mongodb+srv://Kenbeast:Kenbeast254.@atlascluster.heu1doj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
