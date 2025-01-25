import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import KycCreateView from "@/views/KycCreateView.vue";
import apiClient from "../../service/api-client";
import AdminLayoutView from "@/views/AdminLayoutView.vue";

const getUserRole = () => localStorage.getItem("userRole");

const isAuthenticated = () => !!localStorage.getItem("token");

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/login",
			name: "login",
			component: LoginView,
			meta: {requiresAuth: false},
		},
		{
			path: "/",
			redirect: () => {
				const role = getUserRole();
				if (role === "admin") return "/admin";
				if (role === "user") return "/kyc-create";
				return "/login";
			},
		},
		{
			path: "/kyc-create",
			name: "kycUserCreate",
			component: KycCreateView,
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/kyc/:id",
			name: "kycUserDetails",
			component: () => import("@/views/kycDetailsView.vue"),
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/register",
			name: "register",
			component: () => import("@/views/RegisterView.vue"),
			meta: {requireAuth: false},
		},
		{
			path: "/admin",
			component: AdminLayoutView,
			meta: {requiresAuth: true, roles: ["admin"]},
			children: [
				{
					path: "kyc-create",
					name: "kycCreate",
					component: KycCreateView,
				},
				{
					path: "kyc-list",
					name: "kycList",
					component: () => import("@/views/ListKycView.vue"),
				},
				{
					path: "report",
					name: "report",
					component: () => import("@/views/ReportView.vue"),
				},
				{
					path: "kyc/:id",
					name: "kycDetails",
					component: () => import("@/views/kycDetailsView.vue"),
				},
			],
		},
	],
});
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		if (isAuthenticated()) {
			if (
				to.meta.roles &&
				Array.isArray(to.meta.roles) &&
				!to.meta.roles.includes(getUserRole())
			) {
				return next({name: "login"});
			}
			return next();
		} else {
			return next({name: "login"});
		}
	}
	next();
});

export default router;
