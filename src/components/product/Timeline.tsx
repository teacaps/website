import clsx from "clsx";
import { CartFillIcon } from "../../assets/icons/cart-fill";
import { GarageFillIcon } from "../../assets/icons/garage-fill";
import { AirplaneFillIcon } from "../../assets/icons/airplane-fill";
import { ShopFillIcon } from "../../assets/icons/shop-fil";
import { CheckmarkIcon } from "../../assets/icons/checkmark";
import { MagnifyingGlassIcon } from "../../assets/icons/magnifying";

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
		<nav aria-label="Timeline" className="flex w-full items-center justify-center">
			<ol className="relative flex w-4/5 items-center justify-between">
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
						<li key={step.name} className={clsx(`relative rounded-full`, !isLast && "flex-grow")}>
							{!isLast && (
								<div className="absolute inset-0 flex items-center" aria-hidden="true">
									<div className={clsx("h-0.5 w-full", bgColor)} />
								</div>
							)}
							<div
								className={clsx(
									"relative flex h-12 w-12 items-center justify-center rounded-full",
									bgColor,
								)}
								style={{}}>
								<StepIcon className="h-4 w-4 text-grain" />
								<div className={clsx("absolute mt-24 font-medium text-lg leading-none", textColor)}>
									{step.name}
								</div>
							</div>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
