#!/usr/bin/env node

import { program } from "commander";
import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import inquirer from "inquirer";
import axios from "axios";

interface Config {
  destination: string;
}

interface Hook {
  name: string;
  source: string;
}

const DOCS_BASE_URL = "https://azlanibrahim.gitbook.io/hookcn/";
const REGISTRY_URL = "https://cdn.jsdelivr.net/gh/azlanibrahim1/hookcn@main/registry.json";
const CONFIG_FILE_NAME = "hooks.json";
const CONFIG_PATH = path.resolve(process.cwd(), CONFIG_FILE_NAME);
const DEFAULT_INSTALLATION_PATH = "src/hooks/";

/**
 * Get Config
 */
const getConfig = (): Config => {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.log(chalk.yellow(`Configuration file not found. Creating one...`));
    fs.writeJsonSync(CONFIG_PATH, { destination: DEFAULT_INSTALLATION_PATH }, { spaces: 2 });
    console.log(chalk.green(`✓ Default configuration created at ${CONFIG_PATH}`));
    return {
      destination: DEFAULT_INSTALLATION_PATH,
    };
  }
  return fs.readJsonSync(CONFIG_PATH);
};

/**
 * Initialize configuration
 */
async function handleInit() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);
  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow(`Config file '${CONFIG_FILE_NAME}' already exists. No changes made.`));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "destination",
      message: "Set default installation path for hooks:",
      default: DEFAULT_INSTALLATION_PATH,
    },
  ]);

  fs.writeJsonSync(configPath, answers, { spaces: 2 });
  console.log(chalk.green(`✓ Configuration saved to ${configPath}`));
}

/**
 * Add Hooks
 */
const handleAdd = async (hookNames: string[]) => {
  if (hookNames.length === 0) {
    console.log(chalk.red("Hook name is required. Usage: hookcn add <hook-name> [...more hookNames (Optional)]"));
    return;
  }

  const config = getConfig();

  try {
    console.log(chalk.blue("✓ Checking registry."));
    const registryResponse = await axios.get(REGISTRY_URL, { timeout: 10000 });
    const hooks = registryResponse.data;

    const availableHookNames = hooks.map((h: Hook) => h.name);

    const missingHooks = hookNames.filter((name) => !availableHookNames.includes(name));
    if (missingHooks.length > 0) {
      if (hookNames.length > 1) {
        console.log(chalk.red(`The following hooks are not available: ${missingHooks.join(", ")}`));
      } else {
        console.log(chalk.red(`${missingHooks[0]} is not available. use 'hookcn list' to see available hooks.`));
      }
      console.log(chalk.red("Operation Aborted!"));
      return;
    }

    if (!fs.existsSync(config.destination)) {
      fs.mkdirsSync(config.destination);
    }

    for (const hookName of hookNames) {
      const hook = hooks.find((h: Hook) => hookName === h.name);

      const hookDestPath = path.resolve(process.cwd(), config.destination, `${hookName}.ts`);

      // Check if hook already exists
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
          continue;
        }
      }

      console.log(chalk.blue(`✓ Installing ${hookName}`));

      const hookUrl = `https://cdn.jsdelivr.net/gh/azlanibrahim1/hookcn@main/${hook.source}`;

      const hookResponse = await axios.get(hookUrl, { timeout: 10000 });

      if (hookResponse.status !== 200) {
        console.log(chalk.red(`Failed to fetch hook "${hookName}".`));
        continue;
      }

      fs.writeFileSync(hookDestPath, hookResponse.data);
      console.log(chalk.green(`✓ Hook "${hookName}" installed successfully to ${config.destination}`));
    }
    console.log(chalk.magentaBright(`✓ Installation complete!`));
    console.log(" ");

    if (hookNames.length > 1) {
      console.log(chalk.gray(`→ Documentation: ${DOCS_BASE_URL}`));
      return;
    }

    console.log(chalk.gray(`→ Learn about ${hookNames[0]}: ${DOCS_BASE_URL + hookNames[0]}`));
  } catch (error) {
    console.log(chalk.red(`Failed to install hooks. Please check your internet connection.`));
  }
};

/**
 * List Hooks
 */
const handleList = async () => {
  const config = getConfig();

  try {
    const response = await axios.get(REGISTRY_URL);
    console.log(chalk.blue("✓ Collecting Available hooks:"));
    const hooks: { name: string }[] = response.data.sort((a: any, b: any) => a.name.localeCompare(b.name));

    hooks.forEach((hook) => {
      const userHookPath = path.join(config.destination, `${hook.name}.ts`);
      if (fs.existsSync(userHookPath)) {
        console.log(chalk.green(`- ${hook.name} (Installed)`));
      } else {
        console.log(chalk.white(`- ${hook.name}`));
      }
    });
  } catch (error) {
    console.error(chalk.red("Unable to fetch hooks list. Please check your internet connection."));
  }
};

program.name("hookcn").description("A CLI tool that instantly copies React hooks into your codebase");
program.command("init").description("Initialize config file for your hooks").action(handleInit);
program.command("add [hookNames...]").description("Add a specific hook to your project").action(handleAdd);
program.command("list").description("List all available hooks").action(handleList);

program.parse(process.argv);
