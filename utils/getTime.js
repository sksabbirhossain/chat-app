function getTime(timestamp) {
  if (!timestamp) return "";

  const now = new Date();
  const updated = new Date(timestamp);
  const diffInSeconds = Math.floor((now - updated) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  return `${diffInWeeks}w${diffInDays % 7 ? ` ${diffInDays % 7}d` : ""}`;
}
export default getTime;
