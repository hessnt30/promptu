import { Prompt } from "../back-end/src/models";

export const fetchRandomPrompt = async (): Promise<Prompt | null> => {
  try {
    const response = await fetch("http://localhost:8000/api/prompts/random");
    if (!response.ok) throw new Error("Failed to fetch");
    const prompt = await response.json();
    return prompt;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};
