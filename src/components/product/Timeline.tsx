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
	{ name: "Extras", icon: ShopFillIcon },
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
								<div className="absolute inset-0 ml-6 flex items-center sm:ml-0" aria-hidden="true">
									<div className={clsx("h-full w-0.5 sm:h-0.5 sm:w-full", bgColor)} />
								</div>
							)}
							<div
								className={clsx(
									"relative flex h-12 w-12 items-center justify-center rounded-full sm:h-8 sm:w-8 md:h-12 md:w-12",
									bgColor,
								)}>
								<StepIcon className="h-4 w-4 text-grain sm:h-3 sm:w-3 md:h-4 md:w-4" />
								<div
									className={clsx(
										"absolute left-0 ml-16 font-medium text-lg leading-none sm:left-unset sm:ml-0 sm:mt-20 sm:text-sm md:mt-24 md:text-base lg:text-lg",
										textColor,
									)}>
									{step.name}
								</div>
							</div>
						</li>
					);
				})}
			</ol>
		</div>
	);
}
