import { pbkdf2, timingSafeEqual } from "node:crypto";

const encoder = new TextEncoder();
const PBKDF2_PREFIX = "pbkdf2-sha256";

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function deriveKey(password, salt, iterations, length) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, iterations, length, "sha256", (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}

export async function verifyAdminPassword(password, encodedHash) {
  const [prefix, iterationsValue, saltValue, expectedHashValue] = encodedHash.split("$");
  const iterations = Number.parseInt(iterationsValue, 10);

  if (
    prefix !== PBKDF2_PREFIX ||
    !Number.isSafeInteger(iterations) ||
    iterations < 100_000 ||
    !saltValue ||
    !expectedHashValue
  ) {
    return false;
  }

  const salt = decodeBase64Url(saltValue);
  const expectedHash = decodeBase64Url(expectedHashValue);
  const derivedKey = await deriveKey(
    encoder.encode(password),
    salt,
    iterations,
    expectedHash.length,
  );

  return timingSafeEqual(derivedKey, expectedHash);
}
