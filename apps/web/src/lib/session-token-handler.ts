export const decodeSessionToken = (token: string): { userId: string; email: string } | null => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return { userId: payload.sub, email: payload.email };
	} catch {
		return null;
	}
};
