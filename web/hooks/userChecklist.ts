import { ChecklistItem } from "@/app/home/components/checklistTypes";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useChecklist = () => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChecklist = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/checklist");
      setChecklistItems(response.data);
    } catch (error) {
      console.error("Checklist татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchChecklist();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchChecklist]);

  const toggleItem = async (id: string, currentStatus: boolean) => {
    try {
      const response = await axios.patch(`/api/checklist/${id}`, {
        isCompleted: !currentStatus,
      });

      if (response.data.success) {
        setChecklistItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCompleted: !currentStatus } : item,
          ),
        );
      }
    } catch (error) {
      console.error("Шинэчлэхэд алдаа гарлаа:", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await axios.delete(`/api/checklist/${id}`);

      if (response.data.success) {
        setChecklistItems((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Устгахад алдаа гарлаа:", error);
    }
  };

  return {
    checklistItems,
    loading,
    toggleItem,
    deleteItem,
    refreshChecklist: fetchChecklist,
  };
};
