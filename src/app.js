const { Client, Intents, MessageAttachment } = require('discord.js');
const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

require('dotenv').config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS   
  ]
});

const TOKEN = 'token';
const lichessURL = 'https://lichess.org/tournament';
const lichessProfileURL = 'https://lichess.org/@/';

async function getScreenshot(url) {
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(
      new chrome.Options()
      .headless()
      .addArguments("--window-size=1920,1080")
      .addArguments("--lang=en-US")
    )
    .build();

  try {
    await driver.get(url);
    await driver.sleep(1000); // Wait for the page to load completely
    const screenshot = await driver.takeScreenshot();
    return screenshot;
  } finally {
    await driver.quit();
  }
}

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!profile ')) {
    const username = message.content.slice(8);
    const profileURL = lichessProfileURL + username;
    try {
      const screenshot = await getScreenshot(profileURL);
      const attachment = new MessageAttachment(Buffer.from(screenshot, 'base64'), `${username}.png`);
      await message.reply({ files: [attachment] });
    } catch (error) {
      console.error(error);
      await message.reply('Failed to take screenshot.');
    }
  }

  if (message.content === '!tournaments') {
    try {
      const screenshot = await getScreenshot(lichessURL);
      const attachment = new MessageAttachment(Buffer.from(screenshot, 'base64'), 'turnuva.png');
      await message.reply({ files: [attachment] });
    } catch (error) {
      console.error(error);
      await message.reply('Failed to take screenshot.');
    }
  }
});

client.login(process.env.token);
