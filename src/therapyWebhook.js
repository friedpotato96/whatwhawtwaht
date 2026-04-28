const THERAPY_WEBHOOK_URL = "/n8n";

export async function sendTherapyMessage({ message, user, conversation }) {
  const response = await fetch(THERAPY_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      input: message,
      sentMessage: message,
      purpose: message,
      user: {
        id: user?.id ?? null,
        email: user?.email ?? null,
        name: user?.user_metadata?.display_name ?? null,
      },
      conversation,
      sentAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook returned ${response.status}`);
  }

  const text = await response.text();
  console.log("therapy webhook raw response:", text);
  if (!text.trim()) {
    console.log("therapy webhook normalized response:", "[empty response]");
    return "";
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    return text;
  }

  const reply = extractReply(payload);
  if (!reply?.trim()) {
    console.log("therapy webhook normalized response:", "[empty response]");
    return "";
  }

  console.log("therapy webhook normalized response:", reply);
  return reply;
}

function extractReply(payload) {
  if (typeof payload === "string") return payload;

  if (Array.isArray(payload)) {
    const firstUsefulReply = payload
      .map((item) => extractReply(item))
      .find((item) => item && item.trim());
    return firstUsefulReply ?? "";
  }

  const possibleFields = [
    payload.reply,
    payload.response,
    payload.message,
    payload.output,
    payload.text,
    payload.answer,
    payload.data?.reply,
    payload.data?.response,
    payload.data?.message,
    payload.data?.output,
    payload.data?.text,
    payload.body?.reply,
    payload.body?.response,
    payload.body?.message,
    payload.body?.output,
    payload.body?.text,
    payload.json?.reply,
    payload.json?.response,
    payload.json?.message,
    payload.json?.output,
    payload.json?.text,
    payload.result?.reply,
    payload.result?.response,
    payload.result?.message,
    payload.result?.output,
    payload.result?.text,
  ];

  const reply = possibleFields.find(
    (field) => typeof field === "string" && field.trim(),
  );

  if (reply) return reply;

  if (payload && typeof payload === "object") {
    return JSON.stringify(payload);
  }

  return "";
}
