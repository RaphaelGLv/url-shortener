export type AppRequest = Request & {
    user?: {
        userId: string;
        email: string;
    };
};