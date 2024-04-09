import { customAlphabet } from "nanoid";

export const sluggifyTitle = (title: string) => {
  const re = /[^\w\s]/g;

  return title.trim().toLowerCase().replace(re, "").replace(/\s+/g, "-");
};

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
); // 7-character random string

export const getNodeText = (node: React.ReactNode): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (node instanceof Array) return node.map(getNodeText).join("");

  if (typeof node === "object" && (node as any)?.props?.children)
    return getNodeText((node as any).props.children);

  return "";
};
