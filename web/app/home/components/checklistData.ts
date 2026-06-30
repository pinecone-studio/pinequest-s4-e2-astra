import type { ChecklistCategory, ChecklistItem } from "./checklistTypes";

export const checklistCategories: ChecklistCategory[] = ["Чухал", "Ариун цэвэр", "Эм бэлдмэл", "Хувцас", "Технологи"];

export const defaultChecklistItems: ChecklistItem[] = [
  { id: 3, text: "Машины бичиг баримт / Жолооны үнэмлэх", checked: false, category: "Чухал" },
  { id: 4, text: "Шүдний сойз, оо", checked: false, category: "Ариун цэвэр" },
  { id: 5, text: "Шампунь", checked: false, category: "Ариун цэвэр" },
  { id: 6, text: "Нойтон, хуурай салфетка", checked: false, category: "Ариун цэвэр" },
  { id: 7, text: "Нарны тос ", checked: false, category: "Ариун цэвэр" },
  { id: 10, text: "Харшлын эм", checked: false, category: "Эм бэлдмэл" },
  { id: 11, text: "Шархны  боолт, хөвөн", checked: false, category: "Эм бэлдмэл" },
  { id: 16, text: "Малгай / Нарны шил", checked: false, category: "Хувцас" },
  { id: 18, text: "Утасны цэнэглэгч ", checked: false, category: "Технологи" },
  { id: 19, text: "(Powerbank)", checked: false, category: "Технологи" },
  { id: 20, text: "Чихэвч speaker", checked: false, category: "Технологи" },
];
