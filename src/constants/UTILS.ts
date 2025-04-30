export const getInitial = (name: string | undefined) =>
  name && name.length > 0 ? name.charAt(0).toUpperCase() : "";

export const formatDate = (date: string | Date) => {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return parsedDate.toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
