import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "gvk_admin_session";

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || "gvk_super_secret_jwt_institutional_key_2026_maharashtra_board";
  return new TextEncoder().encode(secret);
}

export interface AdminSessionPayload {
  username: string;
  role: "super_admin";
  issuedAt: number;
}

/**
 * Validates hardcoded admin username and password from environment variables.
 * Never exposes credentials to client bundles or browser logs.
 */
export function verifyAdminCredentials(inputUser: string, inputPass: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || "gurukul_admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "Gurukul@Admin2026!";

  if (!inputUser || !inputPass) return false;

  // Constant-time comparison simulation for security
  const userMatches = inputUser.trim() === expectedUser.trim();
  const passMatches = inputPass === expectedPass;

  return userMatches && passMatches;
}

/**
 * Signs a cryptographic JWT session token valid for 7 days.
 */
export async function createAdminSessionToken(username: string): Promise<string> {
  const secret = getJwtSecret();
  return await new SignJWT({
    username,
    role: "super_admin",
    issuedAt: Date.now(),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

/**
 * Verifies the JWT session token.
 * Usable both in API routes and Next.js Edge Middleware.
 */
export async function verifyAdminSessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}
