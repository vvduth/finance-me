import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// export const useGettransaction = () => {
//   const query = useQuery({
//     queryKey: ["transactions"],
//     queryFn: async () => {
//       const response = await client.api.transactions.$get();

//       if (!response.ok) {
//         throw new Error("Failed to fetch transactions");
//       }

//       const { data } = await response.json();
//       return data;
//     },
//   });
//   return query;
// };
