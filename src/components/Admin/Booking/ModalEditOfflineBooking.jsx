import React from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { editOfflineBooking } from "../../../stores/features/offlineBookingSlice";
import { cancelButton, saveButton, select } from "../../../utils/globalVariable";

const ModalEditOfflineBooking = ({
	handleModalEditTrigger,
	handleActionDropdown,
	offlineClassesList,
	update,
}) => {
	const { book_id, class_id, workout, instructor_name } = update;
	const dispatch = useDispatch();

	const handleUpdate = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const class_id = formData.get("class_id");
		dispatch(editOfflineBooking({ book_id, class_id })).then((result) => {
			if (!result.error) {
				handleModalEditTrigger();
				handleActionDropdown();
				setTimeout(
					() =>
						Swal.fire({
							icon: "success",
							title: "Updated",
							text: "Offline booking data successfully updated",
							showConfirmButton: false,
							timer: 2000,
							background: "#ffffff",
						}),
					1000
				);
			} else {
				Swal.fire("Sorry", result.error.message.split(":")[1], "info");
			}
		});
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 pt-16 pb-6 sm:h-full sm:items-center sm:p-0 md:h-full">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Offline Booking
								</h3>
							</div>
							<div className="space-y-6 p-6">
								<div className="relative">
									<Select
										className={`z-30 ${select}`}
										options={offlineClassesList.rows
											?.map((item) => {
												return {
													value: item.class_id,
													label: `${item.workout} - ${item.instructor_name}`,
												};
											})
											.sort((a, b) => a.label.localeCompare(b.label))}
										name="class_id"
										defaultValue={{
											value: class_id,
											label: `${workout} - ${instructor_name}`,
										}}
										placeholder="Select offline classes"
										noOptionsMessage={() => "Membership data not found"}
										isClearable
									/>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalEditTrigger}>
									Cancel
								</button>
								<button type="submit" className={saveButton}>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditOfflineBooking;
