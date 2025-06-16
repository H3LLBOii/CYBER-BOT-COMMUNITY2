const fs = require("fs");
const path = "./groupNameLocks.json";

if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));

module.exports = {
  name: "lockgrpname",
  description: "Set and lock group name in one command",
  usage: "/lockgrpname <new group name>",
  cooldown: 3,
  execute: async ({ api, event, args }) => {
    const threadID = event.threadID;
    const newName = args.join(" ");

    if (!newName) {
      return api.sendMessage("❌ Please provide a name. Usage: /lockgrpname MY NAME BOT", threadID);
    }

    try {
      await api.setTitle(newName, threadID);

      const data = JSON.parse(fs.readFileSync(path));
      data[threadID] = newName;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));

      return api.sendMessage(`✅ Group name changed to "${newName}" and locked.`, threadID);
    } catch (error) {
      return api.sendMessage("❌ Failed to change group name.", threadID);
    }
  },
};
