export const SaveLocation = {
  Collection: "Collection",
  Grails: "Grails",
} as const;

export type SaveLocation = keyof typeof SaveLocation;
