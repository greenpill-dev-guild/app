"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function Web3Provider({ children }: any) {
  // todo: what else do we need to do on login?
  const handleLogin = (user: any) => {
    console.log(`User ${user.id} logged in!`);
  };

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      onSuccess={handleLogin}
      config={{
        appearance: {
          theme: "light",
          logo: "/icons/android-chrome-512x512.png",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
