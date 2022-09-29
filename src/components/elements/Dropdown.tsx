// @ts-expect-error TS1479 TS does not seem to understand that this is being run as a module
import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

import { CheckmarkIcon } from "../../assets/icons/checkmark";
import type { Color } from "../../lib/utils";
import type { ReactNode } from "react";

export function Dropdown({
	options,
	label = null,
	color,
	selected,
	setSelected,
	icon = null,
	className,
}: {
	options: Array<{ key: string; value: string }>;
	color: Color;
	selected: { key: string; value: string };
	setSelected: (key: string) => void;
	label?: ReactNode;
	icon?: ReactNode;
	className?: string;
}) {
	return (
		<Listbox
			value={selected}
			onChange={({ key }) => {
				setSelected(key);
			}}
			defaultValue={options[0]}>
			{({ open }) => (
				<>
					{label && <Listbox.Label className="mb-2 block font-medium text-walnut">{label}</Listbox.Label>}
					<div className={clsx("relative", className)}>
						<Listbox.Button
							className={clsx(
								`border-2 border-${color} text-${color}`,
								`hover:bg-${color} hover:text-${color === "grain" ? "matcha" : "grain"}`,
								`flex h-12 w-full items-center justify-between gap-3 rounded-full px-8 font-medium`,
							)}>
							<span className="block truncate">{selected.value}</span>
							{icon && <span className={`pointer-events-none flex items-center`}>{icon}</span>}
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Listbox.Options
								className={`absolute z-10 mt-3 max-h-60 w-full overflow-auto rounded-2xl border bg-grain py-1 shadow-lg border-${color} focus:outline-none`}>
								{options.map((option) => (
									<Listbox.Option
										key={option.key}
										className={({ active }) =>
											clsx(
												active ? "bg-matcha text-grain" : "text-walnut",
												"relative cursor-default select-none py-2 pl-3 pr-9",
											)
										}
										value={option}>
										{({ selected, active }) => (
											<>
												<span
													className={clsx(
														selected ? "font-bold" : "font-normal",
														"block truncate",
													)}>
													{option.value}
												</span>

												{selected ? (
													<span
														className={clsx(
															active ? "text-grain" : "text-matcha",
															"absolute inset-y-0 right-0 flex items-center pr-4",
														)}>
														<CheckmarkIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}
