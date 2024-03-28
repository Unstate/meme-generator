import { useState } from "react";

// Компонент текстового элемента
export type TextElement = {
  id: number;
  content: string;
  x: number;
  y:number;
}

const useTextElements = () => {
  const [textElements, setTextElements] = useState<TextElement[]>([
    { id: 1, content: "Напишите здесь свой текст", x:0, y:-20 },
    { id: 2, content: "Напишите здесь свой текст", x:0,y:-100 }
  ]);
  const [selectedTextElementId, setSelectedTextElementId] = useState<number | null>(null);

  // Добавление нового текстового элемента
  const addTextElement = (content: string,x:number,y:number) => {
    const newId = Date.now(); // Генерация уникального идентификатора
    const newTextElement: TextElement = {
      id: newId,
      content,
      x,
      y
    };
    setTextElements([...textElements, newTextElement]);
  };

  // Удаление текстового элемента по его идентификатору
  const removeTextElement = (id: number) => {
    setTextElements(textElements.filter(element => element.id !== id));
    if (selectedTextElementId === id) {
      setSelectedTextElementId(null); // Сброс выделения, если удаляем выбранный элемент
    }
  };

  return {
    textElements,
    addTextElement,
    removeTextElement,
  };
};

export default useTextElements;
