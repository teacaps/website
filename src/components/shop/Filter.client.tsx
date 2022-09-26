import type { CollectionFragment } from "../../graphql/storefront.generated";
import { UnstyledButton } from "../elements/input/Button";
import { Dropdown } from "../elements/Dropdown";
import { FilterIcon } from "../../assets/icons/filter";

interface FilterProps {
	collections: Array<CollectionFragment>;
	filter: CollectionFragment["id"];
	setFilter: (filter: CollectionFragment["id"]) => void;
}
export function Filter({ collections, filter = "all", setFilter }: FilterProps) {
	const filterableCollections = [
		{
			title: "All",
			id: "all",
			handle: "all",
		},
		...collections.filter((col) => col.isColorway?.value === "true"),
	];
	return (
		<div className="w-full px-6 md:w-1/6 md:px-0">
			<Dropdown
				options={filterableCollections.map((col) => ({ key: col.id, value: col.title }))}
				icon={<FilterIcon className="h-4 w-4" />}
				color="walnut"
				selected={{ key: filter, value: filterableCollections.find((col) => col.id === filter)!.title }}
				setSelected={setFilter}
				className="w-full md:hidden"
			/>
			<div className="hidden w-full flex-col items-start justify-start space-y-4 md:flex">
				{filterableCollections.map((col) => {
					const active = col.id === filter;
					return (
						<UnstyledButton
							key={col.id}
							className="text-start text-walnut text-lg leading-7"
							disabled={active}
							onClick={() => setFilter(col.id)}>
							{col.title}
						</UnstyledButton>
					);
				})}
			</div>
		</div>
	);
}
