// @ts-expect-error TS1479 TS does not seem to understand that this is being run as a module
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";

export function Drawer({ show, onClose, children }: { show: boolean; onClose: () => void; children?: ReactNode }) {
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
				<div className="fixed inset-0">
					<div className="absolute inset-0 overflow-hidden">
						<div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full">
								<Dialog.Panel className="h-screen min-w-[40ch] max-w-lg transform bg-grain text-left align-middle shadow-md transition-all">
									<header className="sticky top-0 flex inline-flex w-full items-center justify-center space-x-6 px-12 py-6">
										<h2 className="font-medium text-matcha text-lg">Cart</h2>
									</header>
									<div className="grid h-full">
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
