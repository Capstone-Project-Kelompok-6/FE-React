import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import {
	editOnlineClasses,
	editOnlineVideoClasses,
} from "../../../stores/features/onlineClassesSlice";
import { fetchWorkoutList } from "../../../stores/features/workoutSlice";
import {
	cancelButton,
	inputNotError,
	labelNotError,
	saveButton,
	select,
} from "../../../utils/globalVariable";

const baseErrors = {
	video: "",
};

const ModalEditOnlineClasses = ({ handleModalEditTrigger, handleActionDropdown, update }) => {
	const { class_id, video_title, workout, video, video_name, price, description, workout_id } =
		update;
	const dispatch = useDispatch();
	const workoutList = useSelector((state) => state.workout.data);
	const loading = useSelector((state) => state.workout.loading);
	const [file, setFile] = useState("");
	const [fileDataURL, setFileDataURL] = useState(null);
	const [title, setTitle] = useState("");
	const [errors, setErrors] = useState(baseErrors);
	const [load, setLoad] = useState(false);

	const maxTitle = 100;
	const MAX_FILE_SIZE = 5120;

	useEffect(() => {
		dispatch(fetchWorkoutList());
	}, [loading, dispatch]);

	const handleUploadVideo = (e) => {
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const fileSizeKiloBytes = file.size / 1024;

		if (fileSizeKiloBytes > MAX_FILE_SIZE) {
			setErrors({ ...errors, video: "File size is greater than maximum limit" });
			return;
		} else {
			setErrors({ ...errors, video: "" });
		}

		setFile(file);
	};

	useEffect(() => {
		let fileReader,
			isCancel = false;
		if (file) {
			fileReader = new FileReader();
			fileReader.onload = (e) => {
				const { result } = e.target;
				if (result && !isCancel) {
					setFileDataURL(result);
				}
			};
			fileReader.readAsDataURL(file);
		}
		return () => {
			isCancel = true;
			if (fileReader && fileReader.readyState === 1) {
				fileReader.abort();
			}
		};
	}, [file]);

	const handleUpdate = (e) => {
		e.preventDefault();
		setLoad(true);

		const formData = new FormData(e.target);
		const video_title = formData.get("video_title");
		const workout_id = formData.get("workout_id");
		const price = Number(formData.get("price"));
		const description = formData.get("description");
		console.log({ video_title, workout_id, price, description });

		if (!errors.video) {
			dispatch(editOnlineClasses({ class_id, video_title, workout_id, price, description })).then(
				() => {
					const video = formData.get("video");
					if (video.name !== "") {
						dispatch(editOnlineVideoClasses({ class_id, video, video_name })).then((res) => {
							if (res) {
								handleModalEditTrigger();
								handleActionDropdown();
								setTimeout(
									() =>
										Swal.fire({
											icon: "success",
											title: "Updated",
											text: "Online classes data successfully updated",
											showConfirmButton: false,
											timer: 2000,
											background: "#ffffff",
										}),
									1000
								);
								setLoad(false);
							}
						});
					} else {
						handleModalEditTrigger();
						handleActionDropdown();
						setTimeout(
							() =>
								Swal.fire({
									icon: "success",
									title: "Updated",
									text: "Online classes data successfully updated",
									showConfirmButton: false,
									timer: 2000,
									background: "#ffffff",
								}),
							1000
						);
						setLoad(false);
					}
				}
			);
		} else {
			setTimeout(
				() =>
					Swal.fire({
						icon: "error",
						title: "Online classes data cannot updated",
						text: "Please, check your inputed data",
						background: "#ffffff",
					}),
				1000
			);
			setLoad(false);
		}
	};

	const maxLengthCheck = (e) => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.target.maxLength);
		}
	};

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 z-50 bg-gray-400 bg-opacity-50 transition-opacity"></div>

			<div className="fixed inset-0 z-50 items-center justify-center overflow-y-auto">
				<div className="flex w-full items-end justify-center px-4 py-20 sm:h-full sm:items-center sm:p-0 md:h-screen">
					<div className="relative h-full w-full max-w-sm sm:max-w-sm md:h-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
						<form onSubmit={handleUpdate} className="rounded-xl bg-white shadow">
							<div className="flex items-center justify-between rounded-t p-4">
								<h3 className="p-1.5 text-base font-bold text-neutral-100-2 lg:text-lg xl:text-xl">
									Edit Online Classes
								</h3>
							</div>
							<div className="h-[65vh] overflow-y-auto p-6">
								<div className="h-[90&] space-y-6">
									<div>
										<div className="relative">
											<input
												type="text"
												id="video_title"
												name="video_title"
												maxLength={maxTitle}
												onInput={maxLengthCheck}
												onChange={(e) => setTitle(e.target.value)}
												className={inputNotError}
												placeholder=" "
												defaultValue={video_title}
												required
											/>
											<label htmlFor="video_title" className={labelNotError}>
												<span className="block after:ml-1 after:text-red-500 after:content-['*']">
													Video Title
												</span>
											</label>
										</div>
										{title ? (
											<h1 className="mt-2 text-end text-xs font-normal text-dark-4 md:text-sm">
												{title.length}/{maxTitle}
											</h1>
										) : (
											<h1 className="mt-2 text-end text-xs font-normal text-dark-4 md:text-sm">
												{video_title.length}/{maxTitle}
											</h1>
										)}
									</div>
									<div className="relative">
										<Select
											className={`z-50 ${select}`}
											options={workoutList.rows
												?.map((item) => {
													return { value: item.workout_id, label: item.workout };
												})
												.sort((a, b) => a.label.localeCompare(b.label))}
											defaultValue={{ value: workout_id, label: workout }}
											name="workout_id"
											placeholder="Select workout category"
											noOptionsMessage={() => "Workout data not found"}
										/>
									</div>
									<div className="relative">
										{fileDataURL ? (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<video
														src={fileDataURL}
														controls
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-gray-300 object-fill object-center"
													/>
												</div>
											</div>
										) : (
											<div className="my-5 flex w-full items-center justify-center">
												<div className="flex flex-col items-center justify-center">
													<video
														src={video}
														controls
														className="inset-0 h-52 w-80 rounded-lg border-2 border-dashed border-neutral-80 object-fill object-center"
													/>
												</div>
											</div>
										)}
										<input
											className="mb-1 block w-full cursor-pointer rounded-lg border border-neutral-60 text-xs text-secondary-red placeholder-gray-400"
											id="video"
											name="video"
											type="file"
											accept="video/*"
											onChange={handleUploadVideo}
										/>
										<div className="mb-2 flex items-center space-x-4">
											{errors.video && (
												<span className="text-sm text-secondary-red">{errors.video}</span>
											)}
											<div className="min-w-0 flex-1">
												<p className="text-end text-xs font-medium text-neutral-100-2 md:text-sm">
													Max size: 5MB
												</p>
											</div>
										</div>
									</div>
									<div className="relative">
										<input
											type="number"
											min="1"
											id="price"
											name="price"
											className={inputNotError}
											placeholder=" "
											defaultValue={price}
										/>
										<label htmlFor="price" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												Price
											</span>
										</label>
									</div>
									<div className="relative">
										<textarea
											id="description"
											name="description"
											rows="5"
											className={inputNotError}
											placeholder=" "
											defaultValue={description}></textarea>
										<label htmlFor="description" className={labelNotError}>
											<span className="block after:ml-1 after:text-red-500 after:content-['*']">
												{" "}
												Information
											</span>
										</label>
									</div>
								</div>
							</div>
							<div className="flex items-center justify-center space-x-2 p-6">
								<button type="button" className={cancelButton} onClick={handleModalEditTrigger}>
									Cancel
								</button>
								{load ? (
									<button className={saveButton}>
										<PulseLoader size={5} color={"#ffffff"} />
									</button>
								) : (
									<button type="submit" className={saveButton}>
										Save Changes
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalEditOnlineClasses;
