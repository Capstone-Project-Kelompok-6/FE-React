import React from "react";

const SkeletonLoadingOfflineClasses = () => {
	return (
		<div className="rounded-20 bg-white shadow-4">
			<div className="relative overflow-hidden rounded-20 pb-40">
				<div
					role="status"
					className="absolute inset-0 h-full w-full animate-pulse rounded-t-20 bg-gray-300 object-fill object-center p-16 text-center">
					<i className="fi fi-rr-picture text-4xl text-gray-200"></i>
					<span className="sr-only">Loading...</span>
				</div>
			</div>

			<div className="p-5">
				<div className="mb-4 flex items-center space-x-4">
					<div className="w-10 min-w-0 flex-1 animate-pulse rounded-xl bg-gray-300 py-2">
						<p className="text-sm font-bold text-neutral-100-2"></p>
					</div>
					<div className="inline-flex w-16 min-w-0 animate-pulse items-center rounded-xl bg-gray-300 py-2 text-xs font-medium text-neutral-100-2"></div>
				</div>
				<div className="relative mb-28 space-x-2 text-sm">
					<div className="absolute flex">
						<div className="mr-3 mt-0.5 inline-flex h-8 w-8 flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-gray-300 p-1">
							<span className="mt-1 bg-gray-300 text-sm text-gray-100">
								<i className="fi fi-rr-clock-nine-thirty"></i>
							</span>
						</div>
						<div className="grid grid-cols-1 gap-y-2">
							<div className="w-32 animate-pulse rounded-xl bg-gray-300 py-2">
								<h5 className="font-normal tracking-tight text-neutral-100-2"></h5>
							</div>
							<div className="w-32 animate-pulse rounded-xl bg-gray-300 py-2">
								<h5 className="font-normal tracking-tight text-neutral-100-2"></h5>
							</div>
							<div className="w-32 animate-pulse rounded-xl bg-gray-300 py-2">
								<h5 className="font-normal tracking-tight text-neutral-100-2"></h5>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center space-x-3">
					<div className="inline-flex h-10 w-10 flex-shrink-0 animate-pulse items-center justify-center rounded-full bg-gray-300 p-1">
						<span className="mt-1 text-sm text-gray-100">
							<i className="fi fi-sr-user"></i>
						</span>
					</div>

					<div className="w-20 min-w-0 animate-pulse rounded-xl bg-gray-300 py-3">
						<p className="text-base font-medium text-gray-900"></p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoadingOfflineClasses;
