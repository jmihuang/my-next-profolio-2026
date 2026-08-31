const readline = require("readline");
const argon2 = require("argon2");

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

  const hash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

  console.log("\nCopy this value to ADMIN_PASSWORD_HASH in .env.local:");
  console.log(hash);
}

main().catch((error) => {
  console.error(`\nUnable to create password hash: ${error.message}`);
  process.exitCode = 1;
});
