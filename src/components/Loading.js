import React from "react";
import loading from "./loading.svg";

const Loading = () => {
	return (
		<div className="text-center">
			<img className="my-3" src={loading} alt="loading" style={{ width: "80px" }} />
		</div>
	);
};

export default Loading;
