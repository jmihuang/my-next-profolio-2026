const encoder = new TextEncoder();
const PBKDF2_PREFIX = "pbkdf2-sha256";
const MAX_WORKER_ITERATIONS = 100_000;

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left[index] ^ right[index];
  }

  return difference === 0;
}

export async function verifyAdminPassword(password, encodedHash) {
  const [prefix, iterationsValue, saltValue, expectedHashValue] = encodedHash.split("$");
  const iterations = Number.parseInt(iterationsValue, 10);

  if (
    prefix !== PBKDF2_PREFIX ||
    !Number.isSafeInteger(iterations) ||
    iterations < 100_000 ||
    iterations > MAX_WORKER_ITERATIONS ||
    !saltValue ||
    !expectedHashValue
  ) {
    return false;
  }

  const salt = decodeBase64Url(saltValue);
  const expectedHash = decodeBase64Url(expectedHashValue);
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error("PBKDF2 Web Crypto is unavailable");
  }

  const passwordKey = await subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );
  const derivedBits = await subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    passwordKey,
    expectedHash.length * 8,
  );

  return timingSafeEqual(new Uint8Array(derivedBits), expectedHash);
}
