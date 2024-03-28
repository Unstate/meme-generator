import { useState } from "react";
import { TRefactors } from "../data/refactorText"; // Импорт типа для списка рефакторов

// Создаем пользовательский хук useRefactorState
export const useRefactorState = (initialState: TRefactors): {refactorState: TRefactors, toggleActive: (title: string) => void } => {
  // Используем useState для управления состоянием списка рефакторов
  const [refactorState, setRefactorState] = useState<TRefactors>(initialState);

  // Функция toggleActive для изменения состояния активности рефактора по его заголовку
  const toggleActive = (title: string) => {
    // Устанавливаем новое состояние, изменяя активность рефактора с заданным заголовком
    setRefactorState(prevState => {
      // Маппим список рефакторов, чтобы найти нужный рефактор по заголовку
      return prevState.map(refactor => {
        if (refactor.title === title) { // Если заголовок рефактора совпадает с заданным
          return {...refactor, active: !refactor.active}; // Изменяем его активность
        }
        return refactor; // Возвращаем неизмененный рефактор, если заголовки не совпадают
      });
    });
  };

  // Возвращаем текущее состояние списка рефакторов и функцию для изменения активности
  return { refactorState, toggleActive };
};
