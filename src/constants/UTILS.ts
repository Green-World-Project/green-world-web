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

export const getWaterCountdown = (nextWateringDate: string): string => {
  // 1) parse the target date
  const target = new Date(nextWateringDate);
  const now = new Date();

  // 2) difference in milliseconds
  let diff = target.getTime() - now.getTime();

  // 3) if past or exactly now, return all zeros
  if (diff <= 0) {
    return "00:00:00:00";
  }

  // 4) compute days, hours, minutes, seconds
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diff / msInDay);
  diff %= msInDay;

  const hours = Math.floor(diff / msInHour);
  diff %= msInHour;

  const minutes = Math.floor(diff / msInMinute);
  diff %= msInMinute;

  const seconds = Math.floor(diff / msInSecond);

  // 5) pad each unit to 2 digits
  const dd = String(days).padStart(2, "0");
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return `${dd}:${hh}:${mm}:${ss}`;
};

export const getTimeBasedGreeting = (name: string) => {
  const now = new Date();
  const hour = now.getHours();

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon";
  } else if (hour >= 18 && hour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  return `${greeting}, ${name}`;
};
