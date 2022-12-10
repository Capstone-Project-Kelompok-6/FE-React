import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteOfflineBooking } from "../../../stores/features/offlineBookingSlice";
import { fetchOfflineClassesByPrice } from "../../../stores/features/offlineClassesSlice";
import { formatDateTime } from "../../../utils/formatDate";
import { formatPrice } from "../../../utils/formatPrice";
import ModalEditOfflineBooking from "./ModalEditOfflineBooking";

const OfflineBookingListItem = ({ data }) => {
	const {
		book_id,
		class_dates,
		email,
		full_name,
		image_name,
		instructor_name,
		price,
		workout,
		workout_image,
		created_at,
	} = data;
	const dispatch = useDispatch();
	const offlineClassesList = useSelector(
		(state) => state.offlineClasses.data,
	);
	const [actionDropdown, setActionDropdown] = useState(false);
	const [modalEditTrigger, setModalEditTrigger] = useState(false);

	const handleDelete = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton:
					"focus:outline-none text-white bg-secondary-red hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2",
				cancelButton:
					"text-primary-violet hover:text-white border border-secondary-navy hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
				icon: "text-secondary-yellow",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure",
				text: "You can't undo this action.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, Delete it!",
				cancelButtonText: "No, Cancel",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					try {
						dispatch(deleteOfflineBooking(book_id));
						const Toast = Swal.mixin({
							customClass: {
								title: "text-sm",
							},
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 3000,
							timerProgressBar: true,
							width: "auto",
							didOpen: (toast) => {
								toast.addEventListener(
									"mouseenter",
									Swal.stopTimer,
								);
								toast.addEventListener(
									"mouseleave",
									Swal.resumeTimer,
								);
							},
						});

						Toast.fire({
							icon: "success",
							title: "Offline Booking data successfully deleted",
						});
					} catch (error) {
						return Swal.fire({
							icon: "error",
							title: "Maaf",
							text: "Anda gagal logout",
						});
					}
				}
			});
	};

	const handleActionDropdown = () => {
		setActionDropdown(!actionDropdown);
	};

	const handleModalEditTrigger = () => {
		setModalEditTrigger(!modalEditTrigger);
		dispatch(fetchOfflineClassesByPrice(price));
	};

	return (
		<div>
			<div className="relative h-full rounded-20 border bg-white py-4 shadow-4 md:max-w-xl">
				<div className="mb-2 flex items-center px-5">
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium text-neutral-100-2 md:text-base">
							{formatDateTime(created_at)}
						</p>
					</div>
					<div className="mr-4 inline-flex items-center">
						<p className="rounded-full border border-secondary-green bg-tertiary-4 bg-opacity-25 px-2 py-1 font-medium text-secondary-green md:px-3">
							<i className="fi fi-sr-rec mr-1 mt-1 text-[10px]"></i>
							<span className="text-xs">Paid</span>
						</p>
					</div>
					<div className="inline-flex items-center pt-2">
						<button
							className="inline-block text-neutral-80"
							type="button"
							onClick={handleActionDropdown}
						>
							<i className="fi fi-br-menu-dots-vertical"></i>
						</button>
						{actionDropdown && (
							<div>
								<div
									className={
										actionDropdown
											? "pointer-events-auto fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
											: "pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ease-linear"
									}
									onClick={handleActionDropdown}
								></div>
								<div className="absolute right-0 z-40 mr-6 mt-5 w-32 rounded-xl bg-white shadow-4 transition duration-300">
									<ul className="list-reset">
										<li>
											<button
												type="button"
												className="mr-2 inline-flex w-full items-center rounded-t-xl px-5 py-2.5 text-center text-sm font-medium text-neutral-100-2 transition duration-300 ease-in-out hover:rounded-t-xl hover:bg-yellow-50 focus:outline-none"
												onClick={
													handleModalEditTrigger
												}
											>
												<i className="fi fi-sr-pencil mr-2 -ml-1 mt-1 text-sm text-secondary-yellow"></i>
												Edit
											</button>
										</li>
										<li>
											<button
												type="submit"
												className="mr-2 inline-flex w-full items-center rounded-b-xl px-5 py-2.5 text-center text-sm font-medium text-neutral-100-2 transition duration-300 ease-in-out hover:rounded-b-xl hover:bg-red-50 focus:outline-none"
												onClick={
													handleDelete
												}
											>
												<i className="fi fi-sr-trash mr-2 -ml-1 mt-1 text-sm text-secondary-red"></i>
												Delete
											</button>
										</li>
									</ul>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="mx-5 mb-2 border-b border-neutral-100-2 md:mb-1"></div>
				<div className="flex flex-col px-5 md:flex-row md:items-center">
					<img
						className="my-2 h-48 w-full rounded-xl object-cover object-center md:h-[190px] md:w-32"
						src={workout_image}
						alt={image_name}
					/>
					<div className="flex flex-col py-0 px-0 leading-normal md:py-2 md:px-4">
						<h5 className="mb-2 mt-4 text-base font-semibold tracking-tight text-neutral-100-2 md:mt-2">
							{workout}
						</h5>
						<div className="-mb-0 grid grid-cols-2 gap-16 md:-mb-6 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="inline-flex flex-shrink-0 items-center text-sm">
									<span className="mt-1 text-primary-violet">
										<i className="fi fi-sr-clock fi-sr-briefcase mr-2"></i>
									</span>
									<p className="font-medium tracking-tight text-neutral-100-2">
										{instructor_name}
									</p>
								</div>
							</div>
							<div className="inline-flex items-center text-sm font-medium">
								<span className="mt-1 text-secondary-green">
									<i className="fi fi-sr-money fi-sr-briefcase mr-2"></i>
								</span>
								<p className="font-semibold tracking-tight text-neutral-100-2">
									{formatPrice(price)}
								</p>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-1 gap-3 md:mt-10 md:grid-cols-2 md:gap-12 xl:grid-cols-2">
							<div className="flex">
								<div className="flex-shrink-0">
									<span className="mt-1 text-sm text-secondary-navy">
										<i className="fi fi-sr-user fi-sr-briefcase mr-2"></i>
									</span>
								</div>
								<div className="flex-1 leading-relaxed">
									<p className="text-sm font-medium tracking-tight text-neutral-100-2">
										{full_name}
									</p>
									<p className="text-xs font-normal text-neutral-60">
										{email}
									</p>
								</div>
							</div>
							<div className="text-sm font-medium">
								<div className="flex">
									<div className="mr-2 mt-0.5 flex-shrink-0">
										<span className="text-secondary-navy">
											<i className="fi fi-sr-clock"></i>
										</span>
									</div>
									<div className="flex-1 leading-relaxed">
										<p className="font-medium tracking-tight text-neutral-100-2">
											{class_dates &&
												class_dates.map(
													(date) => {
														return (
															date +
															"; "
														);
													},
												)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{modalEditTrigger && (
				<ModalEditOfflineBooking
					handleModalEditTrigger={handleModalEditTrigger}
					offlineClassesList={offlineClassesList}
					update={data}
					handleActionDropdown={handleActionDropdown}
				/>
			)}
		</div>
	);
};

export default OfflineBookingListItem;
