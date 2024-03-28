// Импортируем стили для данного компонента из файла Modal.module.scss
import styles from './Modal.module.scss'

// Импортируем необходимые типы и хуки из React
import { FC, ReactNode, useEffect, useRef } from 'react';

// Импортируем компонент Button из файла Button/Button
import Button from '../Button/Button';

// Определяем интерфейс для свойств компонента Modal
interface ModalProps {
  isOpen: boolean; // Флаг, указывающий, открыто ли модальное окно
  onClose: () => void; // Функция обратного вызова для закрытия модального окна
  children: ReactNode; // Дочерние элементы модального окна
}

// Создаем функциональный компонент Modal с помощью FC
const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Создаем ссылку на DOM-элемент диалогового окна
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Обработчик нажатия клавиши Escape для закрытия модального окна
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose(); // Вызываем функцию onClose для закрытия модального окна
    }
  };

  // Добавляем или удаляем обработчик событий при монтировании или демонтировании компонента
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey, false); // Добавляем обработчик события keydown при открытии модального окна
    } else {
      document.removeEventListener('keydown', handleEscapeKey, false); // Удаляем обработчик события keydown при закрытии модального окна
    }

    // Очищаем обработчик события при демонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEscapeKey, false);
    };
  }, [isOpen]); // Зависимость от состояния isOpen

  return (
    <>
      {/* Рендерим компонент только если модальное окно открыто */}
      {isOpen && (
        <div className={styles.wrapperTest}>
          {/* Диалоговое окно */}
          <dialog className={styles.wrapper} ref={dialogRef} open={isOpen} onClick={(e) => e.stopPropagation()}>
            {children} {/* Дочерние элементы модального окна */}
            {/* Кнопка для закрытия модального окна */}
            <Button onClick={onClose}>Close</Button>
          </dialog>
        </div>
      )}
    </>
  );
};

// Экспортируем компонент Modal по умолчанию
export default Modal;
