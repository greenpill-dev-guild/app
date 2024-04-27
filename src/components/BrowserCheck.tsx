"use client";
import { useEffect } from "react";

interface BrowserCheckProps {
	children: React.ReactNode;
}

export const BrowserCheck: React.FC<BrowserCheckProps> = ({ children }) => {
	useEffect(() => {
		let userAgent = window.navigator.userAgent;
		let browserName, browserVersion;
/*
		if (userAgent.indexOf("Chrome") > -1) {
			browserName = "Google Chrome";
			browserVersion = parseInt(userAgent.split("Chrome/")[1].split(" ")[0]);
			if (browserVersion < 103) {
				throw new Error(
					"Unsupported browser version. Please use Chrome 103 or higher."
				);
			}
		} else if (userAgent.indexOf("Safari") > -1) {
			browserName = "Safari";
			browserVersion = parseInt(userAgent.split("Version/")[1].split(" ")[0]);
			if (browserVersion < 12) {
				throw new Error(
					"Unsupported browser version. Please use Safari 12 or higher."
				);
			}
		} else {
			throw new Error(
				"Unsupported browser. Please use modern versions of Chrome or Safari."
			);
		} */

	}, []); 
	return <>{children}</>;
};
