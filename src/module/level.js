const fs = require("fs");
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const { token } = require("../config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildIntegrations,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.Message,
    Partials.ThreadMember,
    Partials.User,
    Partials.GuildScheduledEvent,
  ],
});

client.once("ready", () => {
  console.log("Level Ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const fs = require("fs");
  let read = fs.readFileSync(require.resolve("../data/level.json"), "utf8");
  let data = JSON.parse(read);

  let user = data[message.author.id];

  if (!user) {
    user = {
      level: 0,
      xp: 0,
    };
  }

  const Experience = {
    get random() {
      var rand = Math.floor(Math.random() * 15);
      return rand + (25 - 15);
    },
  };
  user = {
    level: user.level,
    xp: user.xp + Experience.random,
  };

  let needXp = 5 * user.level * user.level + 50 * user.level + 100;
  if (user.level === 0) needXp = -1;

  if (user.xp > needXp) {
    user.level++;
    user.xp = user.xp - needXp;
    message.reply(
      `레벨이 올랐습니다! \n**${user.level - 1}**lvl -> **${user.level}**lvl`
    );
  }

  data[message.author.id] = user;
  fs.writeFileSync(require.resolve("../data/level.json"), JSON.stringify(data));
});

client.login(token);
