"use client";
import Image from "next/image";
import Splash from "./components/Splash";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Splash />
      <div className="h-full w-full">
        <div className="fixed bottom-0 w-full flex flex-col items-center gap-10">
          <Image
            src="/africa.png"
            alt="Greenpill Africa"
            width={200}
            height={200}
            priority
          />
          <h1 className="xl:text-9xl 2xl:text-[160px] lg:text-8xl md:text-7xl text-[50px] font-semibold text-center">
            GreenPill
            <br />
            Africa
          </h1>
          <div className="w-[90%] rounded-t-3xl bg-white h-96 flex flex-col items-center justify-center px-5 gap-5 text-center text-xs">
            <p className="w-5/6 text-sm">
              To sign-in enter your phone number beginning with country code
              228, then check for a message from Impact Stream (Sandbox) and
              enter your code in the pop-up.
            </p>
            <Button
              className="bg-[#38C793] w-full "
              type="primary"
              size="large"
              onClick={() => router.push("/selectpath")}
            >
              Sign in
            </Button>
            <p className="w-5/6">
              You will need Meta Mask to sign in with your wallet address. If
              you haven’t set one up yet{" "}
              <a href="#" className="text-blue-500">
                click here
              </a>
              .
            </p>
            <p className="absolute bottom-0 pb-4 font-extralight text-xs">
              powered by <b>impact stream</b>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
