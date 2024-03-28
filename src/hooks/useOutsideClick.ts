import { useEffect } from "react";

// Определяем тип для ссылки, указывающей на элемент
type RefType = React.MutableRefObject<HTMLElement | null>;

// Пользовательский хук useOutsideClick для обработки кликов вне указанного элемента
const useOutsideClick = (ref: RefType, handler: () => void) => {
  useEffect(() => {
    // Обработчик кликов вне указанного элемента
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, что ссылка на элемент существует и клик произошел вне этого элемента
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(); // Вызываем переданный обработчик
      }
    };

    // Обработчик нажатия клавиши Escape
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handler(); // Вызываем переданный обработчик
      }
    };

    // Добавляем слушатели событий при монтировании компонента
    document.addEventListener("mousedown", handleClickOutside); // Для кликов мышью
    document.addEventListener("keydown", handleKeyDown); // Для нажатия клавиши Escape

    // Удаляем слушатели событий при демонтировании компонента
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, handler]); // Зависимости от ссылки и обработчика

  // Возвращаем пользовательский хук
};

export default useOutsideClick;
