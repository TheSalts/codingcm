const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");
// const util = require("../util/util");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("급식")
    .setDescription("급식을 확인합니다."),
  /**
   * @param {Discord.CommandInteraction} interaction
   */
  async execute(interaction) {
    // const lang = util.setLang(interaction.locale);
    const axios = require("axios");
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (`${day}`.length === 1) day = `0${day}`;
    let Day = `${year}${month}${day}`;

    let api = await axios.get(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=41b4309f8be54c818c1dcf383b775608&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530879&MLSV_YMD=${Day}`
    );
    let food = api.data.mealServiceDietInfo[1].row[0].DDISH_NM;
    let kcal = api.data.mealServiceDietInfo[1].row[0].CAL_INFO;

    let embed = new Discord.EmbedBuilder()
      .setDescription(food.replaceAll("<br/>", "\n"))
      .setColor("#2F3136")
      .setFooter({ text: kcal + " · " + `${year}.${month}.${day}` });
    await interaction.reply({ embeds: [embed] });
  },
};
