"use client";
import React, { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { getSupabaseClient } from "../../../../lib/supabase";
import { Web3Storage, CIDString, Web3File } from "web3.storage";
import { storeImage } from "./Gallery";
import Image from "next/legacy/image";
import { useTranslations } from "next-intl";

export const ImageUploader = () => {
  const { user } = usePrivy();
  const [files, setFiles] = useState<CIDString>();
  const [storageClient, setStorageClient] = useState<Web3Storage>();
  const [isUploading, setIsUploading] = useState(false);

  function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.NEXT_WEB3_STORAGE_TOKEN;
  }

  useEffect(() => {
    function makeStorageClient() {
      const token = getAccessToken();
      console.log(token, "token");

      if (token) return new Web3Storage({ token: token });
    }

    async function setClient() {
      let client;
      try {
        client = makeStorageClient();
      } catch (error) {
        console.error(error);
      }
      setStorageClient(client);
    }

    setClient();
  }, []);

  function getFiles() {
    const fileInput: any = document.querySelector('input[type="file"]');
    return fileInput?.files;
  }

  async function storeFiles(files: any) {
    if (storageClient) {
      //const cid = await storageClient.put(files)
      const Image = await storeImage(files, "avatar");
      // store CID in DB then display image
      console.log("stored files with cid:", Image?.cid);
      setFiles(Image?.imageGatewayURL);
      try {
        const supabase = await getSupabaseClient();
        const { error } = await supabase
          .from("users")
          .update({
            profile_image_url: Image?.imageGatewayURL,
          })
          .eq("id", user?.id);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
      return Image;
    }
  }

  const uploadFiles = () => {
    setIsUploading(true);
    const files = getFiles();
    try {
      storeFiles(files);
    } catch (error) {
      console.error(error);
    }
    setIsUploading(false);
  };

  const t = useTranslations("Onboarding");

  return (
    <>
      {files && <Image className="pb-4" alt="uploaded image" src={files} />}
      {!files && (
        <>
          <input className="text-sm italic mt-2" type="file" />
          <button
            disabled={isUploading}
            className="border border-slate-400 rounded py-1 px-2 text-sm relative disabled:opacity-50 mt-4 mb-6 hover:bg-sky-600 hover:text-white"
            type="button"
            onClick={uploadFiles}
          >
            Upload
            {isUploading && (
              <svg
                aria-hidden="true"
                className="absolute right-0 top-1 w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </button>
        </>
      )}
    </>
  );
};
