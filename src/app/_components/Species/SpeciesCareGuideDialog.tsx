import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {SpeciesCareGuideSection} from "@/data/models/SpeciesCareGuideItem";
import {capitalize} from "@/utils/string";

type SpeciesCareGuideDialogParams = {
	isOpen: boolean,
	setIsOpen: (arg0: boolean) => void
	sections: SpeciesCareGuideSection[]
}

const SpeciesCareGuideDialog = ({isOpen, setIsOpen, sections}: Readonly<SpeciesCareGuideDialogParams>) => {
	const handleClose = () => setIsOpen(false)

	const dialogContent = sections.map(s => (
		<div key={s.type}>
			<h4 className={'text-textSecondary'}>
				{
					capitalize(s.type)
				}
			</h4>
			<p>{s.description}</p>
		</div>
	))

	return (
		<Dialog open={isOpen} onClose={setIsOpen} className={'relative z-10'}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center">
					<DialogPanel
						transition
						className="relative transform w-3/4 md:w-1/2 overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white p-4 text-left space-y-2">
							<DialogTitle as="h3" className="leading-6 text-primary">
								Care Guide
							</DialogTitle>

							<hr/>

							{dialogContent}

							<hr/>

							<button
								type="button"
								onClick={handleClose}
								className="inline-flex w-auto justify-center font-semibold text-textPrimary">
								Close
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default SpeciesCareGuideDialog