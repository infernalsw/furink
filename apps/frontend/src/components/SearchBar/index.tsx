"use client";

import React, { useState } from "react";
import { match } from "ts-pattern";

export enum SearchResultType {
	Artist = "artist",
}

const SearchResult: React.FC<{ content: string; href: string; type: SearchResultType }> = ({
	content,
	href,
	type,
}) =>
	match(type)
		.with(SearchResultType.Artist, () => (
			<div className="p-4 hover:bg-fuchsia-200 hover:cursor-pointer">
				<p>{content}</p>
			</div>
		))
		.exhaustive();

const Divider: React.FC<{}> = () => <div className="w-full h-px bg-fuchsia-200" />;

export const SearchBar: React.FC<{}> = () => {
	const [focused, setFocused] = useState(false);
	const [query, setQuery] = useState("");

	console.log(query ?? "hi");

	return (
		<div className="col-start-2 h-16 relative flex flex-col items-center pt-2">
			<input
				type="text"
				className="w-full min-h-12 bg-fuchsia-50 border-2 px-4 hover:border-fuchsia-200 rounded-lg"
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Escape") {
						setFocused(false);
					}
				}}
				value={query}
			/>
			{focused && (
				<div className="w-full flex flex-col bg-fuchsia-50 border-2 border-fuchsia-200 rounded-lg mt-4">
					<div className="p-4">{query === "" ? "Try searching for an artist." : query}</div>
					{query !== "" && (
						<>
							<Divider />
							<SearchResult content="Artist Name" href="#" type={SearchResultType.Artist} />
							<Divider />
							<SearchResult content="Artist Name" href="#" type={SearchResultType.Artist} />
						</>
					)}
				</div>
			)}
		</div>
	);
};
