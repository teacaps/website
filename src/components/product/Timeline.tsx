import clsx from "clsx";

import { AirplaneFillIcon } from "../../assets/icons/airplane-fill";
import { CartFillIcon } from "../../assets/icons/cart-fill";
import { CheckmarkIcon } from "../../assets/icons/checkmark";
import { GarageFillIcon } from "../../assets/icons/garage-fill";
import { MagnifyingGlassIcon } from "../../assets/icons/magnifying";
import { ShopFillIcon } from "../../assets/icons/shop-fil";

const steps = [
	{ name: "Preorder", icon: CartFillIcon },
	{ name: "Production", icon: GarageFillIcon },
	{ name: "Inspection", icon: MagnifyingGlassIcon },
	{ name: "Delivery", icon: AirplaneFillIcon },
	{ name: "Fulfilled", icon: CheckmarkIcon },
	{ name: "In-Stock", icon: ShopFillIcon },
] as const;

export function Timeline({ status }: { status?: string }) {
	const currentStepIndex = steps.findIndex(
		(step) => step.name.toLowerCase() === (status || "Fulfilled").toLowerCase(),
	);
	return (
		<div aria-label="Timeline" className="mt-16 flex w-full items-center justify-center sm:pb-8 md:mt-24">
			<ol className="relative flex w-full flex-grow flex-col items-center justify-between sm:flex-row xl:w-4/5">
				{steps.map((step, index) => {
					const StepIcon = step.icon;
					const isLast = index === steps.length - 1;
					const bgColor =
						index === currentStepIndex
							? "bg-matcha"
							: index > currentStepIndex
							? "bg-walnut-60"
							: "bg-matcha-60";
					const textColor =
						index === currentStepIndex
							? "text-matcha"
							: index > currentStepIndex
							? "text-walnut-60"
							: "text-matcha-60";
					return (
						<li
							key={step.name}
							className={clsx(
								`relative -ml-28 rounded-full sm:ml-0 sm:py-0`,
								!isLast && "flex-grow pb-8",
							)}>
							{!isLast && (
								// 15px x-margin on a 2px line to center it to a 32px circle, not pretty
								<div
									className="absolute inset-0 ml-[0.9375rem] flex items-center sm:ml-0"
									aria-hidden="true">
									<div className={clsx("h-full w-0.5 sm:h-0.5 sm:w-full", bgColor)} />
								</div>
							)}
							<div
								className={clsx(
									"relative flex h-8 w-8 items-center justify-center rounded-full lg:h-12 lg:w-12",
									bgColor,
								)}>
								<StepIcon className="h-3 text-grain lg:h-4" />
								<span
									className={clsx(
										"absolute left-0 ml-12 whitespace-nowrap font-medium text-base leading-none sm:left-unset sm:ml-0 sm:mt-20 sm:text-sm md:mt-24 lg:text-lg",
										textColor,
									)}>
									{step.name}
								</span>
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
