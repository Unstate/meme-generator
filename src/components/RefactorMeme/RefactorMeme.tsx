import styles from './styles.module.scss'; // Импорт стилей компонента
import { OUTSIDE_MEME } from '../../pages/HomePage'; // Импорт константы для внешних мемов
import { Dispatch, FC, Fragment, useRef } from 'react'; // Импорт необходимых хуков и компонентов React
import html2canvas from 'html2canvas'; // Импорт библиотеки для создания скриншотов
import useTextElements, { TextElement } from '../../hooks/useTextElements'; // Импорт пользовательского хука для работы с текстовыми элементами
import AsideRefactorMeme from '../AsideRefactorMeme/AsideRefactorMeme'; // Импорт компонента боковой панели для редактирования мемов
import ResizebleBlock from '../../UI/ResizebleBlock/ResizebleBlock'; // Импорт компонента для изменения размера текстового блока
import Button from '../../UI/Button/Button'; // Импорт кнопки
import { useActive } from '../../hooks/useActive'; // Импорт пользовательского хука для управления активным состоянием
import clsx from 'clsx'; // Импорт библиотеки для динамического присвоения классов
import AsideRefactorMemeMobile from '../AsideRefactorMemeMobile/AsideRefactorMemeMobile'; // Импорт компонента мобильной боковой панели для редактирования мемов
import { useImageElements } from '../../hooks/useImageElements'; // Импорт пользовательского хука для работы с изображениями
import ResizebleImageBlock from '../../UI/ResizebleBlock/ResizebleImageBlock'; // Импорт компонента для изменения размера изображения

// Определяем тип для пропсов компонента RefactorMeme
type TRefactorMeme = {
  activeButton: string, // Активная кнопка (внутренний или внешний мем)
  imageSrc:string | null, // Ссылка на изображение
  setActiveButton: Dispatch<React.SetStateAction<string>>, // Функция для установки активной кнопки
}

// Компонент RefactorMeme
const RefactorMeme: FC<TRefactorMeme> = ({activeButton,imageSrc,setActiveButton}) => {
  // Используем пользовательские хуки для работы с текстовыми и изображениями элементами
  const {
    textElements,
    addTextElement,
    removeTextElement,
  } = useTextElements();

  const {
    addImageElement,
    imageElements,
    removeImageElement,
  } = useImageElements()

  // Создаем ссылку на элемент, который представляет контейнер для мема
  const memeContainerRef = useRef<HTMLDivElement>(null);

  // Используем пользовательский хук для управления активным состоянием модального окна
  const {state:activeModal, set:setActiveModal} = useActive(false)

  // Функция для сохранения изображения
  const handleSaveImage = () => {
    if (memeContainerRef.current) {
      html2canvas(memeContainerRef.current).then(canvas => {
        const url = canvas.toDataURL();
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meme.png';
        link.click();
      });
    }
  };

  return (
    <section className={styles.refactorMemeWrapper}>
      <div className={styles.memeWrapper}>
        <div ref={memeContainerRef}>
          {/* Если активная кнопка - внешний мем, отображаем пустые блоки текста */}
          {activeButton === OUTSIDE_MEME && <div className={styles.textOutside}></div>}
          {/* Отображаем изображение мема */}
          <img className={styles.meme} src={imageSrc ? imageSrc : ''} />
          {/* Если активная кнопка - внешний мем, отображаем пустые блоки текста */}
          {activeButton === OUTSIDE_MEME && <div className={styles.textOutside}></div>}
          {/* Отображаем текстовые элементы */}
          <Fragment>
            {textElements.map((textElement:TextElement) => 
              <ResizebleBlock 
                id={textElement.id} 
                removeTextElement={removeTextElement} 
                key={textElement.id} 
                x={textElement.x}
                y={textElement.y}
                text={textElement.content}/>)}
          </Fragment>
          {/* Отображаем изображения */}
          <Fragment>
            {imageElements.map((textElement:TextElement) => 
              <ResizebleImageBlock 
                id={textElement.id} 
                removeTextElement={removeImageElement} 
                key={textElement.id} 
                x={textElement.x}
                y={textElement.y}
                content={textElement.content}/>)}
          </Fragment>
        </div>
      </div>
      {/* Кнопка для сохранения изображения */}
      <Button classNameOfTag={styles.generateButton} onClick={handleSaveImage}>
            Сгенерировать мем
      </Button>
      {/* Мобильная боковая панель */}
      <AsideRefactorMemeMobile 
      activeModal={activeModal}
      addImageElement={addImageElement}
      addTextElement={addTextElement}
      removeTextElement={removeTextElement} 
      activeButton={activeButton} 
      setActiveButton={setActiveButton}
      handleSaveImage={handleSaveImage}/>
      {/* Кнопка для открытия боковой панели */}
      <Button onClick={() => setActiveModal(activeModal ? false : true)} className={clsx(styles.settingsButton, {
        [styles.activeModal]: activeModal
      })}>
          <img src='./icons/settings.svg'/>   
      </Button>
      {/* Боковая панель */}
      <AsideRefactorMeme 
      addImageElement={addImageElement}
      addTextElement={addTextElement}
      removeTextElement={removeTextElement} 
      activeButton={activeButton} 
      setActiveButton={setActiveButton}
      handleSaveImage={handleSaveImage}/>
    </section>
  );
};

export default RefactorMeme;

