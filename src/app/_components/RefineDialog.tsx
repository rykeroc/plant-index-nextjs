import {Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import {useState} from "react";
import FilterDropdowns from "@/app/_components/FilterDropdowns";

type RefineDialogParams = {
	isOpen: boolean,
	setIsOpen: (arg0: boolean) => void
	initOrder: string,
	initCycle: string,
	initWatering: string,
	initSunlight: string,
	setOrder: (arg0: string) => void,
	setCycle: (arg0: string) => void,
	setWatering: (arg0: string) => void,
	setSunlight: (arg0: string) => void,
}

const RefineDialog = ({
  	isOpen, setIsOpen,
	initOrder, initCycle, initWatering, initSunlight,
	setOrder, setCycle, setWatering, setSunlight
}: Readonly<RefineDialogParams>) => {
	const [dialogOrder, setDialogOrder] = useState(initOrder)
	const [dialogCycle, setDialogCycle] = useState(initCycle)
	const [dialogWatering, setDialogWatering] = useState(initWatering)
	const [dialogSunlight, setDialogSunlight] = useState(initSunlight)

	const handleApplyClick = () => {
		console.log(`RefineDialog - handleApplyClick called`)
		setOrder(dialogOrder)
		setCycle(dialogCycle)
		setWatering(dialogWatering)
		setSunlight(dialogSunlight)
		console.log(`RefineDialog - handleApplyClick: Updated filter vars to order=${dialogOrder}, cycle=${dialogCycle}, watering=${dialogWatering}, sunlight=${dialogSunlight}`)
		setIsOpen(false)
	}

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
						className="relative transform min-w-48 sm:w-1/4 sm:max-w-72 overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white p-4 text-left space-y-4">
							<DialogTitle as="h3" className="font-semibold leading-6 text-textPrimary">
								Refine
							</DialogTitle>

							<div className={"space-y-1"}>
								<FilterDropdowns
									order={dialogOrder} setOrder={setDialogOrder}
									cycle={dialogCycle} setCycle={setDialogCycle}
									watering={dialogWatering} setWatering={setDialogWatering}
									sunlight={dialogSunlight} setSunlight={setDialogSunlight}/>
							</div>

							<button
								type="button"
								onClick={handleApplyClick}
								className="inline-flex w-auto justify-center font-semibold text-textPrimary"
							>
								Apply
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default RefineDialog