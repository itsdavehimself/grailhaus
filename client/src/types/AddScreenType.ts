export const AddScreenType = {
  Collection: "Collection",
  Grails: "Grails",
} as const;

export type AddScreenType = keyof typeof AddScreenType;
