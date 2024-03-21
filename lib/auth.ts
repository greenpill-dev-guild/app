import { nanoid } from "nanoid";
import { jwtVerify, SignJWT, JWTPayload } from "jose";

export const generateAccessToken = async (address: string, userId: string) => {
  return await new SignJWT({ address, sub: userId, aud: "authenticated" })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("2m")
    .sign(
      new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN_SECRET as string
      )
    );
};

export const generateRefreshToken = async (address: string, userId: string) => {
  return await new SignJWT({ address, sub: userId, aud: "authenticated" })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(
      new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SUPABASE_REFRESH_TOKEN_SECRET as string
      )
    );
};
export const verifyAccessToken = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SUPABASE_ACCESS_TOKEN_SECRET as string
      )
    );
    return { data: verified.payload as JWTPayload, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(
        process.env.NEXT_PUBLIC_SUPABASE_REFRESH_TOKEN_SECRET as string
      )
    );
    return { data: verified.payload as JWTPayload, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
