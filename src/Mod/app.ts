import express from "express";
import { exec } from "child_process";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), "../public");
app.use(express.static(__dirname));

app.get("/execmd", (req, res) => {
  const cmd = req.query.cmd;
  const args = req.query.args;

  if (!cmd) {
    res.status(400).json({ error: "Comando no introducido" });
  } else {
    exec(`${cmd} ${args || ""}`, (error, stdout, stderr) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
      if (stderr) {
        res.status(500).json({ error: stderr });
        return;
      }
      res.json({ output: stdout });
    });
  }
});

app.use((req, res) => {
  res.status(404).send('404 - Not found');
});

app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
