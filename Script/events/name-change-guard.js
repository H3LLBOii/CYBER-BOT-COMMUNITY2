const fs = require("fs");
const path = "./groupNameLocks.json";

module.exports = async function ({ api, event }) {
  if (event.logMessageType === "log:thread-name") {
    const data = JSON.parse(fs.readFileSync(path));
    const threadID = event.threadID;

    if (data[threadID] && event.logMessageData?.name !== data[threadID]) {
      api.setTitle(data[threadID], threadID, (err) => {
        if (!err) {
          api.sendMessage("⚠ Group name is locked. Reverting change.", threadID);
        }
      });
    }
  }
};
