import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";
type ResponseType = InferResponseType<typeof client.api.categories.$post>
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

export const useCreatecategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async(json) => {
            const response = await client.api.categories.$post({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("category created!")
            queryClient.invalidateQueries({queryKey:["categories"]});
        },
        onError() {
            toast.error("Error created category!")
        },
    })

    return mutation
} 