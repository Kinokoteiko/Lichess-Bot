# Lichess bot

This is a simple Discord bot that takes screenshots of Lichess user profiles and tournaments using Selenium WebDriver and sends them to a Discord channel using the Discord.js library.

## Setup

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install`.
3. Set up a new Discord bot by following [this guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).
4. Add your bot's token to a new file called `.env` in the root of the project. The contents of the `.env` file should look like this: `token=YOUR_TOKEN_HERE`.
5. Run the bot using `npm start`.

## Usage

To take a screenshot of a Lichess profile, use the `!profile` command followed by the Lichess username. For example, `!profile chessbrah`.

To take a screenshot of the Lichess tournaments page, use the `!tournaments` command.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
