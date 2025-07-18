import type { Watch } from "../types/Watch";

export const fetchSearchResults = async (
  apiUrl: string,
  search: string
): Promise<Watch[]> => {
  const response = await fetch(`${apiUrl}/api/watch/search?query=${search}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    const message = Array.isArray(errorData)
      ? errorData.join(", ")
      : errorData?.message || "Search failed. Try again.";
    throw new Error(message);
  }

  return await response.json();
};
