// Импортируем стили для данного компонента из файла styles.module.scss
import styles from './styles.module.scss'

// Импортируем тип данных TRefactors из файла refactorText, который содержит информацию о рефакторингах
import { TRefactors } from '../../data/refactorText'

// Импортируем библиотеку clsx для работы с классами CSS
import clsx from 'clsx'

// Создаем компонент TextEditor, принимающий два аргумента: refactorState и toggleActive
const TextEditor = ({refactorState, toggleActive}:{refactorState:TRefactors, toggleActive: (title: string) => void}) => {
  return (
    // Обертка компонента с классом, определенным в стилях
    <section className={styles.wrapper}>
      {/* Контейнер для отображения списка рефакторингов */}
      <div className={styles.container}>
        {/* Маппим каждый объект refactorState и создаем блок для отображения каждого рефакторинга */}
        {refactorState.map((refactor) =>
          <div
            // Уникальный ключ для каждого блока
            key={refactor.title}
            // Обработчик клика, вызывающий функцию toggleActive с заголовком рефакторинга
            onClick={() => toggleActive(refactor.title)}
            // Применяем классы из стилей, используя clsx для условного добавления класса, если рефакторинг активен
            className={clsx(styles.refactor, {
              [styles.refactorActive]: refactor.active
            })}>
            {/* Изображение рефакторинга */}
            <img
              className={styles.image}
              src={refactor.image}
              alt={refactor.title} />
          </div>
        )}
      </div>
    </section>
  )
}

// Экспортируем компонент TextEditor по умолчанию
export default TextEditor
