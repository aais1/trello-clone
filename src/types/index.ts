export type CardType = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

export type BoardData = {
  [key: string]: ColumnType;
};

export type BoardCardProps = {
  id: string;
  title: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};
