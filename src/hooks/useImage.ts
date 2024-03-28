import { Dispatch, useState } from "react"

// Определяем тип для управления изображением
export const useImage = (initial: string | null): { imageSrc: string | null, setImage: Dispatch<React.SetStateAction<string | null>> } => {
  // Используем useState для отслеживания состояния изображения
  const [image, setImage] = useState<string | null>(initial);

  // Возвращаем текущее изображение и функцию для его установки
  return {
    imageSrc: image, // Текущее изображение
    setImage // Функция для установки нового изображения
  }
}
