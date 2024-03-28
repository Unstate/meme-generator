// Импортируем библиотеку clsx для работы с классами CSS
import clsx from 'clsx';

// Импортируем стили для данного компонента из файла styles.module.scss
import styles from './styles.module.scss';

// Импортируем необходимые типы и компоненты из React
import { ButtonHTMLAttributes, FC } from "react"

// Определяем тип TButtonSelect для свойств компонента ButtonSelect
export type TButtonSelect = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode; // Дочерние элементы кнопки
  classNameOfTag?: string; // Дополнительный класс для кнопки
  isActive: boolean; // Флаг, указывающий, активна ли кнопка
}

// Создаем функциональный компонент ButtonSelect с помощью FC
const ButtonSelect: FC<TButtonSelect> = ({ children, classNameOfTag, isActive , ...props }) => {
  return (
    // Возвращаем JSX компонента
    <button {...props} className={clsx(styles.button, classNameOfTag, { // Применяем классы стилей с помощью clsx
      [styles.isActive]: isActive // Применяем класс isActive, если кнопка активна
    })}>
      {children} {/* Дочерние элементы кнопки */}
    </button>
  )
}

// Экспортируем компонент ButtonSelect по умолчанию
export default ButtonSelect;
