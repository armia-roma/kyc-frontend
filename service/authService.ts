import apiClient from "./api-client";

export const login = async (data: { email: string; password: string }) => {
	const response = await apiClient.post("/user/login", data);
	const token = response.data.user.token;
	localStorage.setItem("token", token);
	localStorage.setItem("userRole", response.data.user.role);
	return response.data;
};
export const register = async (data: {
	userName: string;
	email: string;
	password: string;
	role: string;
}) => {
	return apiClient.post("/user/register", data);
};
