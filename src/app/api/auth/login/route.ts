import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../../../lib/auth";

// Create a single supabase client with admin rights
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(request: Request) {
  const { address, userId } = await request.json();
  if (!address || !userId) {
    return NextResponse.json(
      {
        error: "Invalid credentials",
      },
      { status: 401 }
    );
  }
  const accessToken = await generateAccessToken(address, userId);
  const refreshToken = await generateRefreshToken(address, userId);

  const { error } = await supabaseAdmin.from("users").insert({
    id: userId,
    address,
  });
  console.error(error);
  const response = NextResponse.json(
    {
      message: "Authentication Successful",
    },
    { status: 200 }
  );

  response.headers.set(
    "set-cookie",
    `supabase-access-token=${accessToken}; Max-Age=${120}; Secure; Path=/; Secure; SameSite=Strict; Path=/;`
  );
  response.headers.append(
    "set-cookie",
    `supabase-refresh-token=${refreshToken}; Max-Age = ${
      86400 * 30
    }; Secure; SameSite=Strict; Path=/;`
  );
  return response;
}
