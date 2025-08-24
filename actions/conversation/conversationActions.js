import { Fetch } from "@/utils/Fetch";

//get all conversations by userId
export const getConversationsByUserId = async (userId) => {
  try {
    const res = await Fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/conversations/${userId}?page=${page}&limit=${limit}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
