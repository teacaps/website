import { Link } from "@shopify/hydrogen";
import clsx from "clsx";
import { ChevronRightIcon } from "../../assets/icons/chevron-right";
import { Teacap } from "../../assets/teacap";

export interface BreadcrumbsProps {
	pages: Array<{ name: string; href: string }>;
	icon?: ({ className }?: { className?: string }) => JSX.Element;
	className?: string;
}
export function Breadcrumbs({ pages, icon = Teacap, className }: BreadcrumbsProps) {
	const StartingIcon = icon;
	const startingLink = pages.shift();
	return (
		<nav className={clsx("flex", className)} aria-label="Breadcrumb">
			<ol className="flex flex-wrap items-center gap-y-2 gap-x-2">
				<li>
					<div>
						<Link to={startingLink!.href} className="text-walnut-80 hover:text-walnut">
							<StartingIcon className="h-5 flex-shrink-0" aria-hidden="true" />
							<span className="sr-only">Home</span>
						</Link>
					</div>
				</li>
				{pages.map((page, i) => {
					const isLast = i === pages.length - 1;
					return (
						<li key={page.name}>
							<div className="flex items-center">
								<ChevronRightIcon className="h-5 flex-shrink-0 text-walnut-80" aria-hidden="true" />
								<Link
									to={page.href}
									className={clsx(
										"ml-4 font-medium text-sm",
										isLast ? "text-matcha" : "text-walnut-80 hover:text-walnut",
									)}
									aria-current={isLast ? "page" : undefined}>
									{page.name}
								</Link>
							</div>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
