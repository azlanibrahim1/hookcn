#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import axios from "axios";

interface Config {
  destination: string;
  registryUrl?: string;
  docsBaseUrl?: string;
}

interface Hook {
  name: string;
  source: string;
}

const DEFAULT_DOCS_BASE_URL = "https://azlanibrahim.gitbook.io/use-cli/";
const DEFAULT_REGISTRY_URL = "https://cdn.jsdelivr.net/gh/azlanibrahim1/use-cli@main/registry.json";
const CONFIG_FILE_NAME = "hooks.json";
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_INSTALLATION_PATH = "src/hook/";

/**
 * Get Config
 */
const getConfig = (): Config => {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(chalk.yellow(`Configuration file not found. Creating one...`));
    fs.writeJsonSync(CONFIG_PATH, { destination: DEFAULT_INSTALLATION_PATH }, { spaces: 2 });
    console.log(chalk.green(`Default configuration created at ${CONFIG_PATH}`));
    return {
      destination: DEFAULT_INSTALLATION_PATH,
    };
  }
  return fs.readJsonSync(CONFIG_PATH);
};

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

/**
 * Add Hooks
 */
const handleAdd = async (hookName: string) => {
  if (!hookName || hookName.trim() === "") {
    console.log(chalk.red("Hook name is required. Usage: hookcli add <hook-name>"));
    return;
  }

  const config = getConfig();
  const registryUrl = config.registryUrl || DEFAULT_REGISTRY_URL;
  const docsUrl = config.docsBaseUrl || DEFAULT_DOCS_BASE_URL;
  const hookDoc = docsUrl + hookName;

  try {
    console.log(chalk.blue("✓ Checking registry."));
    const registryResponse = await axios.get(registryUrl, { timeout: 10000 });
    const hooks = registryResponse.data;
    const hook = hooks.find((h: Hook) => h.name === hookName);

    if (!hook) {
      console.log(chalk.red(`Hook "${hookName}" is not available. Use 'hookcli list' to see available hooks.`));
      return;
    }

    const hookUrl = hook.source;
    const hookDestPath = path.resolve(process.cwd(), config.destination, `${hookName}.ts`);

    console.log(chalk.blue(`✓ Copying ${hookName}`));

    const hookResponse = await axios.get(hookUrl, { timeout: 10000 });

    if (hookResponse.status !== 200) {
      console.log(chalk.red(`Failed to fetch hook "${hookName}".`));
      return;
    }

    if (!fs.existsSync(config.destination)) {
      fs.mkdirsSync(config.destination);
    }

    if (fs.existsSync(hookDestPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: "confirm",
          name: "overwrite",
          message: `Hook "${hookName}.ts" already exists. Overwrite?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow(`Skipped overwriting "${hookName}.ts".`));
        return;
      }
    }

    fs.writeFileSync(hookDestPath, hookResponse.data);
    console.log(chalk.green(`Hook "${hookName}" copied successfully to ${config.destination}.`));
    console.log(chalk.gray(`Learn about ${hookName}: ${hookDoc}`));
  } catch (error) {
    console.log(chalk.red(`Failed to fetch hook "${hookName}". Please check the hook name or your internet connection.`));
  }
};

program.name("use-cli").description("A CLI tool for copying React hooks into your project");
program.command("init").description("Initialize config file for your hooks").action(handleInit);
program.command("add <hookName>").description("Add a specific hook to your project").action(handleAdd);

program.parse(process.argv);
