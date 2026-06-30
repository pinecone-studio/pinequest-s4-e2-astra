export type ChecklistCategory = "Чухал" | "Ариун цэвэр" | "Эм бэлдмэл" | "Хувцас" | "Технологи";

export type ChecklistItem = {
  id: number;
  text: string;
  checked: boolean;
  category: ChecklistCategory;
};
