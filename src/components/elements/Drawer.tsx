// @ts-expect-error TS1479 TS does not seem to understand that this is being run as a module
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import { XIcon } from "../../assets/icons/x";

export function Drawer({
	title,
	show,
	onClose,
	children,
}: {
	title?: string;
	show: boolean;
	onClose: () => void;
	children?: ReactNode;
}) {
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog as="div" className="z-50" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 left-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-walnut bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 h-screen w-screen">
					<div className="absolute inset-0 overflow-hidden">
						<div className="fixed inset-y-0 flex h-screen max-w-full md:right-0 md:w-unset md:pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-0"
								leaveTo="translate-x-full">
								<Dialog.Panel className="h-screen w-screen min-w-[40ch] transform bg-grain text-left align-middle shadow-md transition-all lg:w-auto lg:max-w-lg">
									<header className="sticky top-0 flex w-screen items-center justify-between px-8 py-6 md:w-full md:justify-center md:px-12">
										{(title || null) && (
											<h2 className="font-medium text-matcha text-lg">{title}</h2>
										)}
										<button onClick={onClose}>
											<XIcon className="h-8 w-8 text-matcha" />
										</button>
									</header>
									<div className="grid h-full w-screen md:w-unset">
										<Dialog.Title className="sr-only">Cart</Dialog.Title>
										{children}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export function useDrawer(openDefault = false) {
	const [isOpen, setIsOpen] = useState(openDefault);

	return {
		isOpen,
		openDrawer: () => setIsOpen(true),
		closeDrawer: () => setIsOpen(false),
	};
}
