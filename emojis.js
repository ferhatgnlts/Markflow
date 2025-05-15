// emojis.js
export const emojiMap = {
  ":smile:": "😄",
  ":laughing:": "😆",
  ":wink:": "😉",
  ":blush:": "😊",
  ":heart_eyes:": "😍",
  ":sunglasses:": "😎",
  ":thinking:": "🤔",
  ":neutral:": "😐",
  ":cry:": "😢",
  ":sob:": "😭",
  ":angry:": "😠",
  ":astonished:": "😲",
  ":sleeping:": "😴",
  ":poop:": "💩",

  ":thumbsup:": "👍",
  ":thumbsdown:": "👎",
  ":clap:": "👏",
  ":wave:": "👋",
  ":ok_hand:": "👌",
  ":pray:": "🙏",
  ":fist:": "✊",

  ":heart:": "❤️",
  ":heartpulse:": "💓",
  ":broken_heart:": "💔",
  ":sparkles:": "✨",
  ":fire:": "🔥",
  ":star:": "⭐",

  ":dog:": "🐶",
  ":cat:": "🐱",
  ":unicorn:": "🦄",
  ":monkey:": "🐵",
  ":dragon:": "🐉",

  ":coffee:": "☕",
  ":pizza:": "🍕",
  ":cake:": "🍰",
  ":tada:": "🎉",
  ":gift:": "🎁",
  ":balloon:": "🎈",
  ":book:": "📖",

  ":warning:": "⚠️",
  ":check:": "✅",
  ":x:": "❌",
  ":question:": "❓",
  ":info:": "ℹ️",
  ":lock:": "🔒",
  ":key:": "🔑",

  ":computer:": "💻",
  ":phone:": "📱",
  ":gear:": "⚙️",
  ":rocket:": "🚀",
  ":bug:": "🐛",
  ":tools:": "🛠️"
};

export function convertEmojis(text) {
  return text.replace(/:\w+:/g, match => emojiMap[match] || match);
}