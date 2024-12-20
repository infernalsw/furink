import { ProfileCard } from "@/components/ProfileCard";

import "./globals.css";
import { Providers } from "./providers";

export const NavBar = () => <div className="flex flex-row h-16 bg-fuchsia-100 col-span-3"></div>;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en" className="w-full h-full">
				<body className="grid grid-rows-content grid-cols-content gap-4 w-full h-full">
					<NavBar />
					<div className="justify-self-end">
						<ProfileCard
							profile={{
								avatarUrl: "https://placehold.co/96x96/png",
								bannerUrl: "https://placehold.co/384x192/png",
								bio: "Example **markdown** *bio*\n\n- list item 1\n- list item 2\n# you fool it is here",
								country: null,
								createdAt: new Date(),
								displayName: "kaylen",
								timezone: "UTC",
								updatedAt: new Date(),
								userId: "123",
								websiteUrl: null,
							}}
						/>
					</div>
					<div className="flex flex-col col-start-2 row-start-2 overflow-auto">{children}</div>
				</body>
			</html>
		</Providers>
	);
}
