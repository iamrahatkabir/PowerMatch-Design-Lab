export type Category = {
  slug: string;
  name: string;
  description: string;
  /** Categories still waiting on designs show as "Coming soon" and aren't clickable. */
  ready: boolean;
};

export const categories: Category[] = [
  {
    slug: "settings",
    name: "Settings",
    description: "Account, workspace and preference screens.",
    ready: true,
  },
];
