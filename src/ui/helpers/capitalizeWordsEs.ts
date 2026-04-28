export function capitalizeWordsEs(value: string): string {
  const s = value.trim().replace(/\s+/g, " ");
  if (!s) return "";
  return s
    .split(" ")
    .map((word) => {
      const lower = word.toLocaleLowerCase("es");
      return lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1);
    })
    .join(" ");
}
