// Импорт необходимых модулей и компонентов
import React, { ButtonHTMLAttributes, FC } from "react"
import styles from './Button.module.scss' // Импорт стилей для кнопки из файла Button.module.scss
import clsx from "clsx" // Импорт библиотеки для работы с классами CSS

// Определение типа TButton для свойств кнопки
export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode; // Дочерние элементы кнопки
  classNameOfTag?: string; // Дополнительный класс для кнопки
}

// Создание функционального компонента Button с помощью FC
const Button: FC<TButton> = ({ children, classNameOfTag, ...props }) => {
  return (
    // Возвращаем JSX компонента
    <button className={clsx(styles.button, classNameOfTag)} {...props}>
      {children} {/* Дочерние элементы кнопки */}
    </button>
  )
}

// Экспорт компонента Button по умолчанию
export default Button
