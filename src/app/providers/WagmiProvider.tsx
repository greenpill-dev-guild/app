"use client";

import { configureChains } from "wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { optimism, optimismSepolia } from "viem/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { PrivyWagmiConnector } from "@privy-io/wagmi-connector";

const configureChainsConfig = configureChains(
  [optimism, optimismSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_JSON_RPC_URL as string,
      }),
    }),
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ]
);

export function WagmiProvider({ children }: any) {
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
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        {children}
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
