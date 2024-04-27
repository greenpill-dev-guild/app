import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getCookie, setCookie, hasCookie } from "cookies-next";

import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "@/modules/auth";

export default function useCheckTokens() {
  const [isAccessTokenValid, setIsAccessTokenValid] = useState<boolean>(true);
  const [isRefreshTokenValid, setIsRefreshTokenValid] = useState<boolean>(true);
  const { user, ready, authenticated } = usePrivy();

  useEffect(() => {
    const checkTokenExpirations = async () => {
      console.log("Checking token expirations...");
      if (ready && authenticated) {
        const userAddress = user?.wallet?.address;
        const userId = user?.id;
        if (!hasCookie("supabase-refresh-token")) {
          setIsRefreshTokenValid(false);
        } else {
          const refreshToken = getCookie("supabase-refresh-token");
          const { error } = await verifyRefreshToken(refreshToken as string);
          if (error) {
            setIsRefreshTokenValid(false);
          } else {
            setIsRefreshTokenValid(true);
          }
        }
        if (!hasCookie("supabase-access-token")) {
          setIsAccessTokenValid(false);
          const newAccessToken = await generateAccessToken(
            userAddress as string,
            userId as string
          );
          setCookie("supabase-access-token", newAccessToken, {
            maxAge: 60 * 60 * 24 * 30,
            secure: true,
            sameSite: "strict",
          });
          setIsAccessTokenValid(true);
        } else {
          const accessToken = getCookie("supabase-access-token");
          const { error } = await verifyAccessToken(accessToken as string);
          if (error) {
            setIsAccessTokenValid(false);
            const newAccessToken = await generateAccessToken(
              userAddress as string,
              userId as string
            );
            setCookie("supabase-access-token", newAccessToken, {
              maxAge: 60 * 60 * 24 * 30,
              secure: true,
              sameSite: "strict",
            });
            setIsAccessTokenValid(true);
          } else {
            setIsAccessTokenValid(true);
          }
        }
      }
    };
    checkTokenExpirations();
    const intervalId = setInterval(checkTokenExpirations, 60000);
    return () => clearInterval(intervalId);
  }, [ready, authenticated, user?.wallet?.address, user?.id]);
  return { isAccessTokenValid, isRefreshTokenValid };
}
