// Импортируем стили для данного компонента из файла styles.module.scss
import styles from './styles.module.scss';

// Импортируем хуки и компоненты из библиотек и файлов нашего проекта
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import clsx from "clsx";
import { useActive } from "../../hooks/useActive";
import { useRefactorState } from "../../hooks/useRefactorState";
import useOutsideClick from "../../hooks/useOutsideClick";
import TextEditor from "../TextEditor/TextEditor";
import { REFACTORS } from "../../data/refactorText";

// Создаем компонент ResizebleBlock
const ResizebleBlock = ({ text, removeTextElement, id, x, y }: { text: string, removeTextElement: (id: number) => void, id: number, x: number, y: number }) => {
  // Используем пользовательский хук useActive для управления состоянием активности кнопок редактирования и перетаскивания
  const { state: activeDragButton, set: setActiveDragButton } = useActive(false);
  const { state: activeEditorButton, set: setActiveEditorButton } = useActive(false);

  // Используем пользовательский хук useRefactorState для управления состоянием рефакторингов
  const { refactorState, toggleActive } = useRefactorState(REFACTORS);

  // Создаем ссылку на DOM-элемент
  const ref = useRef<HTMLDivElement>(null);

  // Хук useState для отслеживания активных стилей
  const [blockStyles, setBlockStyles] = useState({
    'underline': false,
    'bold': false,
    'red': false,
    'yellow': false,
    'green': false,
    'black': false,
    'italic': false,
    '20px': false,
    '30px': false,
  });

  // Функция для закрытия редактора при клике вне его области
  function close() {
    setActiveEditorButton(false);
  }

  // Используем пользовательский хук useOutsideClick для обработки кликов за пределами компонента
  useOutsideClick(ref, close);

  // Функция для установки активных стилей
  function setActiveStyles() {
    const updatedTest: any = { ...blockStyles };

    // Проходим по всем рефакторингам и устанавливаем активные стили
    refactorState.forEach((refactorElement) => {
      if (refactorElement.active) {
        updatedTest[refactorElement.title] = refactorElement.active;
      } else {
        updatedTest[refactorElement.title] = false;
      }
    });

    setBlockStyles(updatedTest);
  }

  // Используем хук useEffect для обновления активных стилей при изменении состояния рефакторингов
  useEffect(() => {
    setActiveStyles();
  }, [refactorState]);

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
          width: 360,
          height: 200,
        }}
      > 
        {/* Отображаем компонент TextEditor, если активна кнопка редактирования */}
        {activeEditorButton && <TextEditor refactorState={refactorState} toggleActive={toggleActive} />}
        
        {/* Текстовое поле */}
        <textarea defaultValue={text} style={{
          fontWeight: blockStyles.bold ? "bold" : "normal", // Применяем жирный шрифт, если соответствующий стиль активен
          textDecoration: blockStyles.underline ? 'underline' : 'none', // Применяем подчеркивание, если соответствующий стиль активен
          color: blockStyles.red ? 'red' : blockStyles.yellow ? 'yellow' : blockStyles.green ? 'green' : blockStyles.black ? 'black' : 'white', // Применяем цвет текста в зависимости от активного стиля
          fontStyle: blockStyles.italic ? 'italic' : 'normal', // Применяем курсив, если соответствующий стиль активен
          fontSize: blockStyles["20px"] ? '20px' : blockStyles["30px"] ? '30px' : '' // Применяем размер шрифта в зависимости от активного стиля
        }} className={clsx(styles.text)} /> {/* Применяем классы стилей для текстового поля */}
        
        {/* Кнопка удаления, отображаемая при активации редактора */}
        {activeEditorButton && (
          <div className={styles.rotatable} onClick={() => removeTextElement(id)}>
            <img src='./icons/delete.svg'/>
          </div>
        )}
      </Rnd>
    </div>
  );
};

// Экспортируем компонент ResizebleBlock по умолчанию
export default ResizebleBlock;
