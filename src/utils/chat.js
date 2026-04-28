export const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: "I am here with you. Start with whatever feels most present right now.",
  },
];

export function buildSessionTitle(messages, fallbackTitle) {
  const firstUserMessage = messages
    .find((message) => message.role === "user")
    ?.text?.trim();
  if (!firstUserMessage) return fallbackTitle || "New chat";

  return firstUserMessage.length > 44
    ? `${firstUserMessage.slice(0, 44).trim()}...`
    : firstUserMessage;
}

export function getSessionPreview(messages) {
  const latestMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant" || message.role === "user");

  return latestMessage?.text ?? "Start a new private reflection.";
}

export function formatSessionTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(timestamp));
}
