#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";

interface Config {
  destination: string;
  registryUrl?: string;
}

interface Hook {
  name: string;
  source: string;
}

const DEFAULT_REGISTRY_URL = "https://cdn.jsdelivr.net/gh/azlanibrahim1/use-cli@main/registry.json";
const CONFIG_FILE_NAME = "hooks.json";
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_INSTALLATION_PATH = "src/hook/";

/**
 * Initialize configuration
 */
const handleInit = async () => {
  if (fs.existsSync(CONFIG_PATH)) {
    console.log(chalk.yellow(`Config file '${CONFIG_FILE_NAME}' is already exists. No changes made.`));
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "destination",
      message: "Set default installation path for hooks:",
      default: DEFAULT_INSTALLATION_PATH,
      validate: (input) => input.trim() !== "" || "Path cannot be empty!",
    },
  ]);

  fs.writeJsonSync(CONFIG_PATH, answers, { spaces: 2 });
  console.log(chalk.green(`Configuration saved to ${CONFIG_PATH}`));
};

program.name("use-cli").description("A CLI tool for copying React hooks into your project");
program.command("init").description("Initialize config file for your hooks").action(handleInit);

program.parse(process.argv);
