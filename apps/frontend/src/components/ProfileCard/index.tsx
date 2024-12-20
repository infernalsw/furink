import type { UserProfile } from "@prisma/client";
import Image from "next/image";
import React from "react";
import Markdown from "react-markdown";

const ProfileTag: React.FC<{ content: string }> = ({ content }) => (
	<div className="bg-fuchsia-300 text-fuchsia-900 rounded-full px-4 py-2 m-1 flex items-start uppercase text-xs">
		{content}
	</div>
);

export const ProfileCard: React.FC<{ profile: UserProfile }> = ({ profile }) => (
	<div className="flex flex-col shrink-0 bg-fuchsia-200 w-96 rounded-lg overflow-hidden">
		{/* card header image */}
		<div className="h-48 w-full">
			<Image width={384} height={192} src={profile.bannerUrl!} alt="profile" />
		</div>

		<div className="flex flex-col -translate-y-12">
			<div className="flex flex-row shrink-0  mx-4 items-end">
				<div className="h-24 w-24 rounded-full overflow-hidden bg-fuchsia-300  border-fuchsia-200 border-4">
					<Image width={96} height={96} src={profile.avatarUrl!} alt="profile" />
				</div>
				<ProfileTag content="developer" />
				<ProfileTag content="+1" />
			</div>

			<div className="flex flex-col mx-6">
				<div className="text-lg">{profile.displayName}</div>
				<Markdown
					className="text-sm"
					components={{
						em: ({ children }) => <em className="italic">{children}</em>,
						strong: ({ children }) => <strong className="font-bold">{children}</strong>,
						ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
						ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
						a: ({ children, href }) => (
							<a className="text-fuchsia-700" href={href}>
								{children}
							</a>
						),
					}}
				>
					{profile.bio}
				</Markdown>
			</div>
		</div>
	</div>
);
