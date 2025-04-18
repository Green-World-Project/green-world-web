export const getInitial = (name: string | undefined) =>
  name && name.length > 0 ? name.charAt(0).toUpperCase() : "";
