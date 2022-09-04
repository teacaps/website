import type { CollectionFragment } from "../../graphql/generated";
import { UnstyledButton } from "../elements/Button";

interface FilterProps {
	collections: Array<CollectionFragment>;
	filter: CollectionFragment["id"];
	setFilter: (filter: CollectionFragment["id"]) => void;
}
export function Filter({ collections, filter, setFilter }: FilterProps) {
	const filterableCollections = [
		{
			title: "All",
			id: "all",
			handle: "all",
		},
		...collections.filter((col) => col.isColorway?.value === "true"),
	];
	return (
		<div className="flex w-1/6 flex-shrink-0 flex-col items-start justify-start space-y-4">
			{filterableCollections.map((col) => {
				const active = col.id === filter;
				return (
					<UnstyledButton
						key={col.id}
						className="text-start text-lg leading-7 text-walnut"
						disabled={active}
						onClick={() => setFilter(col.id)}>
						{col.title}
					</UnstyledButton>
				);
			})}
		</div>
	);
}
