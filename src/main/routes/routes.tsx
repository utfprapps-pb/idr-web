import React from "react";

type RouteProps = {
	path: () => string;
	component: React.ReactNode;
};

type RoutesProps = {
	[key: string]: RouteProps;
};

export const ROUTES = Object.freeze<RoutesProps>({
	login: {
		path: () => "/",
		component: <h1>Hello</h1>,
	},
});
