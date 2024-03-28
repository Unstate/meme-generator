import { useState } from "react";

// Компонент текстового элемента
export type TextElement = {
  id: number;
  content: string;
  x: number;
  y:number;
}

export const useImageElements = () => {
  const [imageElements, setImageElements] = useState<TextElement[]>([]);

  // Добавление нового текстового элемента
  const addImageElement = (content: string,x:number,y:number) => {
    const newId = Date.now(); // Генерация уникального идентификатора
    const newImageElement: TextElement = {
      id: newId,
      content,
      x,
      y
    };
    setImageElements([...imageElements, newImageElement]);
  };

  // Удаление текстового элемента по его идентификатору
  const removeImageElement = (id: number) => {
    setImageElements(imageElements.filter(element => element.id !== id));
  };

  return {
    imageElements,
    addImageElement,
    removeImageElement,
  };
};