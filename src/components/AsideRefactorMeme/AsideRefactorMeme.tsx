import styles from './styles.module.scss'; // Импорт стилей компонента
import clsx from "clsx"; // Импорт функции для объединения классов
import { Dispatch, FC, useEffect } from "react"; // Импорт необходимых типов и компонентов React
import { ReactSVG } from "react-svg"; // Импорт компонента ReactSVG
import { INSIDE_MEME, OUTSIDE_MEME } from "../../pages/HomePage"; // Импорт констант для определения типа мема
import ButtonSelect from "../../UI/ButtonSelect/ButtonSelect"; // Импорт компонента ButtonSelect
import Button from "../../UI/Button/Button"; // Импорт компонента Button
import ImageInput from '../../UI/ImageInput/ImageInput'; // Импорт компонента ImageInput
import { useImage } from '../../hooks/useImage'; // Импорт пользовательского хука useImage

// Определение типа пропсов для компонента AsideRefactorMeme
type TAsideRefactorMeme = {
  activeButton: string; // Текущая активная кнопка
  setActiveButton: Dispatch<React.SetStateAction<string>>; // Функция для установки активной кнопки
  addTextElement: (content: string, x: number, y: number) => void; // Функция для добавления текстового элемента
  addImageElement: (content: string, x: number, y: number) => void; // Функция для добавления изображения
  removeTextElement: (id: number) => void; // Функция для удаления текстового элемента
  handleSaveImage: () => void; // Функция для сохранения изображения
}

// Компонент AsideRefactorMeme
const AsideRefactorMeme: FC<TAsideRefactorMeme> = ({ activeButton, setActiveButton, addTextElement, handleSaveImage, addImageElement }) => {
  
  const { imageSrc, setImage } = useImage(''); // Получение состояния изображения и функции для его установки

  // Обработчик изменения изображения
  const handleOnChange = (src: string | null) => {
    setImage(src);
  }

  // Эффект, вызываемый при изменении изображения
  useEffect(() => {
    // Если есть изображение, добавляем его в мем
    imageSrc && addImageElement(imageSrc, 100, -300);
  }, [imageSrc]);

  return (
    // Секция с боковой панелью редактирования мема
    <aside className={styles.rigthSideModal}>
      <h1 className={styles.memeRefactorTitle}>Редактор мемов</h1>
      {/* Контейнер с кнопками для выбора типа мема */}
      <div className={styles.changeMemeButtonsWrapper}>
        {/* Кнопка для выбора текста внутри мема */}
        <ButtonSelect onClick={() => setActiveButton(INSIDE_MEME)} isActive={activeButton === INSIDE_MEME}>
          {/* Иконка */}
          <ReactSVG className={clsx(styles.iconInsideButton, { [styles.isActive]: activeButton === INSIDE_MEME })} src='./icons/text-inside.svg' />
          Текст внутри
        </ButtonSelect>
        {/* Кнопка для выбора текста снаружи мема */}
        <ButtonSelect onClick={() => setActiveButton(OUTSIDE_MEME)} isActive={activeButton === OUTSIDE_MEME}>
          {/* Иконка */}
          <ReactSVG className={clsx(styles.iconInsideButton, { [styles.isActive]: activeButton === OUTSIDE_MEME })} src='./icons/text-outside.svg' />
          Текст снаружи
        </ButtonSelect>
      </div>
      {/* Контейнер с кнопками для добавления текста и изображения */}
      <div className={styles.buttonsWrapper}>
        {/* Кнопка для добавления текста */}
        <Button onClick={() => addTextElement('Напишите свой текст', 100, -100)}>Добавить текст</Button>
        {/* Компонент для загрузки изображения */}
        <ImageInput onChange={handleOnChange} />
        {/* Кнопка для сохранения мема */}
        <Button onClick={handleSaveImage}>Сгенерировать мем</Button>
      </div>
    </aside>
  );
}

export default AsideRefactorMeme; // Экспорт компонента AsideRefactorMeme
