"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  consumeDueAlarmDate,
  fetchUncheckedChecklistItems,
  getDueReminderDate,
} from "./heroNotificationScheduler";
import {
  buildNotificationId,
  getStoredNotifications,
  saveStoredNotifications,
} from "./heroNotificationStorage";
import {
  activeChatSessionStorageKey,
  type CreateChecklistNotificationInput,
  type MonTripNotification,
} from "./heroNotificationTypes";
import { playNotificationSound } from "./playNotificationSound";

export function useHeroNotifications() {
  const [notifications, setNotifications] = useState<MonTripNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<MonTripNotification | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const persistNotifications = useCallback((next: MonTripNotification[]) => {
    setNotifications(next);
    saveStoredNotifications(next);
  }, []);

  const createChecklistNotification = useCallback(
    async ({
      allowEmptyChecklist = false,
      departureAt,
      message,
      type,
    }: CreateChecklistNotificationInput) => {
      const checklistResult = await fetchUncheckedChecklistItems();
      if (!checklistResult && !allowEmptyChecklist) return;

      const sessionId =
        checklistResult?.sessionId ?? localStorage.getItem(activeChatSessionStorageKey);
      const uncheckedItems = checklistResult?.uncheckedItems ?? [];
      if (!allowEmptyChecklist && uncheckedItems.length === 0) return;

      const notificationId = buildNotificationId(
        type,
        sessionId,
        departureAt,
        uncheckedItems,
      );
      const existingNotifications = getStoredNotifications();
      if (existingNotifications.some((notification) => notification.id === notificationId)) {
        return;
      }

      const nextNotification: MonTripNotification = {
        id: notificationId,
        title: "Аяллын checklist",
        message,
        createdAt: new Date().toISOString(),
        itemTitles: uncheckedItems.slice(0, 3).map((item) => item.title),
        read: false,
        sessionId,
      };

      persistNotifications([nextNotification, ...existingNotifications].slice(0, 20));
      setToast(nextNotification);
      playNotificationSound();
      window.setTimeout(() => setToast(null), 5200);
    },
    [persistNotifications],
  );

  const checkChecklistReminders = useCallback(async () => {
    const departureAt = getDueReminderDate();
    if (!departureAt) return;

    await createChecklistNotification({
      departureAt,
      message: "Check хийгдээгүй зүйл үлдсэн байна. Гарахаас 12 цагийн өмнөх сануулга.",
      type: "reminder",
    });
  }, [createChecklistNotification]);

  const checkAlarmNotification = useCallback(async () => {
    const alarmAt = consumeDueAlarmDate();
    if (!alarmAt) return;

    await createChecklistNotification({
      allowEmptyChecklist: true,
      departureAt: alarmAt,
      message: "Цаг боллоо. Checklist-ээ шалгаад үлдсэн зүйлсээ бэлдээрэй.",
      type: "alarm",
    });
  }, [createChecklistNotification]);

  useEffect(() => {
    const runChecks = () => {
      void checkChecklistReminders();
      void checkAlarmNotification();
    };
    const timer = window.setTimeout(() => {
      setNotifications(getStoredNotifications());
      runChecks();
    }, 0);
    const interval = window.setInterval(runChecks, 3_000);

    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [checkAlarmNotification, checkChecklistReminders]);

  const openNotifications = () => {
    setIsOpen(true);
    persistNotifications(
      getStoredNotifications().map((notification) => ({ ...notification, read: true })),
    );
  };

  const deleteNotification = (notificationId: string) => {
    persistNotifications(
      getStoredNotifications().filter((notification) => notification.id !== notificationId),
    );
  };

  return {
    deleteNotification,
    isOpen,
    notifications,
    openNotifications,
    setIsOpen,
    setToast,
    toast,
    unreadCount,
  };
}
