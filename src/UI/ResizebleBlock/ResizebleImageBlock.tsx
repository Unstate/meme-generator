// Импортируем стили для данного компонента из файла styles.module.scss
import styles from './styles.module.scss';

// Импортируем хук useRef из React для создания ссылки на DOM-элемент
import { useRef } from "react";

// Импортируем компонент Rnd из библиотеки react-rnd для создания изменяемого блока
import { Rnd } from "react-rnd";

// Импортируем библиотеку clsx для работы с классами CSS
import clsx from "clsx";

// Импортируем пользовательский хук useActive из файла ../../hooks/useActive для управления активностью элементов
import { useActive } from "../../hooks/useActive";

// Импортируем пользовательский хук useOutsideClick из файла ../../hooks/useOutsideClick для обработки кликов за пределами компонента
import useOutsideClick from "../../hooks/useOutsideClick";

// Создаем компонент ResizebleImageBlock, который принимает некоторые свойства
const ResizebleImageBlock = ({
  content,
  removeTextElement,
  id,
  x,
  y
}: { content: string, removeTextElement: (id: number) => void, id: number, x: number, y: number }) => {
  // Используем пользовательский хук useActive для управления состоянием активности кнопок редактирования и перетаскивания
  const { state: activeDragButton, set: setActiveDragButton } = useActive(false);
  const { state: activeEditorButton, set: setActiveEditorButton } = useActive(false);
  
  // Создаем ссылку на DOM-элемент
  const ref = useRef<HTMLDivElement>(null)

  // Функция для закрытия редактора при клике вне его области
  function close() {
    setActiveEditorButton(false)
  }

  // Используем пользовательский хук useOutsideClick для обработки кликов за пределами компонента
  useOutsideClick(ref, close)

  return (
    // Возвращаем JSX компонента
    <div
      ref={ref} // Привязываем созданную ссылку к элементу
      onMouseDown={() => setActiveDragButton(true)} // Обработчик события нажатия кнопки мыши
      onMouseUp={() => setActiveDragButton(false)} // Обработчик события отпускания кнопки мыши
      onClick={() => setActiveEditorButton(true)} // Обработчик события клика по элементу
      className={styles.wrapper} // Применяем классы стилей из модуля styles.module.scss
    >
      {/* Изменяемый блок, созданный с помощью компонента Rnd */}
      <Rnd
        className={clsx(styles.rnd, { // Применяем классы стилей с условным добавлением класса activeRnd при активности кнопок редактирования или перетаскивания
          [styles.activeRnd]: activeDragButton || activeEditorButton
        })}
        default={{ // Устанавливаем начальные значения размеров и позиции блока
          x: x,
          y: y,
          width: 300,
          height: 200,
        }}
      >
        {/* Изображение */}
        <img className={styles.image} src={content} />

        {/* Кнопка удаления, отображаемая при активации редактора */}
        {activeEditorButton && (
          <div className={clsx(styles.rotatable,styles.rotatableImage)} onClick={() => removeTextElement(id)}>
            <img src='./icons/delete.svg' />
          </div>
        )}
      </Rnd>
    </div>
  );
};

// Экспортируем компонент ResizebleImageBlock по умолчанию
export default ResizebleImageBlock;
