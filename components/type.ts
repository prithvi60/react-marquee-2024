export type MarqueeProps = {
  // rtl?: boolean;
  // autofill?: boolean;
  children: React.ReactNode;
};
export interface ListItem {
  title: string;
  desc: string;
}

// Define the type for the list prop
export interface ListItem {
  title: string;
  desc: string;
}

// Define the props type for ExampleCard
export interface ExampleCardProps {
  list: ListItem;
}
