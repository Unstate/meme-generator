import { useState, SetStateAction } from "react";

// Определяем тип для состояния активности
type ActiveState<T> = {
  state: T; // Текущее состояние активности
  set: (value: SetStateAction<T>) => void; // Функция для установки нового состояния активности
};

// Создаем кастомный хук useActive
export const useActive = <T extends any>(initial: T): ActiveState<T> => {
  // Используем useState для отслеживания состояния активности
  const [state, setState] = useState<T>(initial);

  // Функция set для установки нового состояния активности
  const set = (value: SetStateAction<T>) => {
    setState(value);
  };

  // Возвращаем текущее состояние активности и функцию для его установки
  return { state, set };
};
