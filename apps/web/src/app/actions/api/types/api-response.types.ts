// It must be passed down from server actions to client side components
// because Next.js does not allow server actions to directly throw errors,
// they mask them to avoid exposing server internals to the client.

export type ApiResponse<T> = {
    success: boolean;
    data: T;
}