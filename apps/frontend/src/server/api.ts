import { Axios } from "axios";

// attempt to guard against accidental client-side usage
if (window) {
	throw new Error("This module should only be imported on the server");
}

export const client = new Axios({
	baseURL: process.env.UPSTREAM_URL,
});
