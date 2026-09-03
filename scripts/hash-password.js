const readline = require("readline");
const { pbkdf2, randomBytes } = require("crypto");
const { promisify } = require("util");

const deriveKey = promisify(pbkdf2);
const ITERATIONS = 100000;
const KEY_LENGTH = 32;

function toBase64Url(value) {
  return value
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function askForPassword(question) {
  return new Promise((resolve) => {
    const terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    terminal.stdoutMuted = true;
    terminal._writeToOutput = function writeMaskedCharacter(value) {
      if (terminal.stdoutMuted && value !== "\n") {
        terminal.output.write("*");
        return;
      }
      terminal.output.write(value);
    };

    terminal.question(question, (password) => {
      terminal.output.write("\n");
      terminal.close();
      resolve(password);
    });
  });
}

async function main() {
  const password = await askForPassword("Password: ");
  const confirmation = await askForPassword("Confirm password: ");

  if (password.length < 12) {
    throw new Error("Password must be at least 12 characters long.");
  }

  if (password !== confirmation) {
    throw new Error("Passwords do not match.");
  }

  const salt = randomBytes(16);
  const derivedKey = await deriveKey(password, salt, ITERATIONS, KEY_LENGTH, "sha256");
  const hash = `pbkdf2-sha256$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(derivedKey)}`;

  console.log("\nCopy this value to ADMIN_PASSWORD_HASH in .env.local and Cloudflare:");
  console.log(hash);
}

main().catch((error) => {
  console.error(`\nUnable to create password hash: ${error.message}`);
  process.exitCode = 1;
});
