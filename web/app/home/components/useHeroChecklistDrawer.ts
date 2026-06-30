"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { defaultChecklistItems } from "./checklistData";
import type { ChecklistCategory, ChecklistItem } from "./checklistTypes";

type AudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

function playBeepSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

export function useHeroChecklistDrawer() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ChecklistCategory>("Чухал");
  const [alarmDate, setAlarmDate] = useState("2026-07-01");
  const [alarmTime, setAlarmTime] = useState("07:30");
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isAlarmTriggered, setIsAlarmTriggered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedItems = localStorage.getItem("montrip-checklist-v11");
      const savedDate = localStorage.getItem("montrip-alarm-date");
      const savedTime = localStorage.getItem("montrip-alarm-time");
      const savedIsSet = localStorage.getItem("montrip-alarm-set");

      if (savedItems && savedItems !== "[]") {
        setItems(JSON.parse(savedItems));
      } else {
        setItems(defaultChecklistItems);
        localStorage.setItem("montrip-checklist-v11", JSON.stringify(defaultChecklistItems));
      }

      if (savedDate) setAlarmDate(savedDate);
      if (savedTime) setAlarmTime(savedTime);
      if (savedIsSet) setIsAlarmSet(savedIsSet === "true");
      setIsLoaded(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAlarmTriggered) {
      playBeepSound();
      audioIntervalRef.current = setInterval(playBeepSound, 1000);
    } else if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isAlarmTriggered]);

  useEffect(() => {
    if (!isAlarmSet || isAlarmTriggered) return;

    const checkAlarm = () => {
      const now = new Date();
      const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      const timeString = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      if (todayString === alarmDate && timeString === alarmTime) {
        setIsAlarmTriggered(true);
        setIsAlarmSet(false);
        localStorage.setItem("montrip-alarm-set", "false");
      }
    };

    const interval = setInterval(checkAlarm, 3000);
    return () => clearInterval(interval);
  }, [alarmDate, alarmTime, isAlarmSet, isAlarmTriggered]);

  const saveItems = (updatedItems: ChecklistItem[]) => {
    setItems(updatedItems);
    localStorage.setItem("montrip-checklist-v11", JSON.stringify(updatedItems));
  };

  const toggleAlarmSetting = () => {
    const newState = !isAlarmSet;
    setIsAlarmSet(newState);
    localStorage.setItem("montrip-alarm-set", String(newState));
    localStorage.setItem("montrip-alarm-date", alarmDate);
    localStorage.setItem("montrip-alarm-time", alarmTime);
  };

  const toggleCheck = (id: number) => {
    saveItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const addItem = (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    saveItems([
      ...items,
      {
        id: Date.now(),
        text: inputValue.trim(),
        checked: false,
        category: selectedCategory,
      },
    ]);
    setInputValue("");
  };

  const deleteItem = (id: number) => {
    saveItems(items.filter((item) => item.id !== id));
  };

  return {
    addItem,
    alarmDate,
    alarmTime,
    deleteItem,
    inputValue,
    isAlarmSet,
    isAlarmTriggered,
    isLoaded,
    selectedCategory,
    setAlarmDate,
    setAlarmTime,
    setInputValue,
    setIsAlarmTriggered,
    setSelectedCategory,
    toggleAlarmSetting,
    toggleCheck,
    visibleItems: items.filter((item) => item.category === selectedCategory),
  };
}
