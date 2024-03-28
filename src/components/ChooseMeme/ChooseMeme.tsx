import styles from './styles.module.scss'; // Импорт стилей компонента
import { Dispatch, FC } from 'react'; // Импорт необходимых типов и компонентов React
import Button from '../../UI/Button/Button'; // Импорт компонента кнопки
import ImageInput from '../../UI/ImageInput/ImageInput'; // Импорт компонента для загрузки изображения
import Modal from '../../UI/Modal/Modal'; // Импорт модального окна
import { IMAGES, TImages } from '../../data/images'; // Импорт данных об изображениях

// Определяем тип пропсов для компонента ChooseMeme
type TChooseMeme = {
  handleImageChange: (src: string | null) => void; // Функция для изменения изображения
  open: () => void; // Функция для открытия модального окна
  close: () => void; // Функция для закрытия модального окна
  visible: boolean; // Флаг видимости модального окна
  setImage: Dispatch<React.SetStateAction<string | null>>; // Функция для установки изображения
}

// Компонент ChooseMeme
const ChooseMeme: FC<TChooseMeme> = ({handleImageChange, open, visible, setImage, close}) => {
  return (
    <>
      {/* Заголовок и описание */}
      <section className={styles.title}>
        <h1>Генератор Мемов</h1>
        <p>Создайте мем из изображений JPG, GIF или PNG. <br />
          Отредактируйте свое изображение и создайте мем.
        </p>
      </section>

      {/* Секция с кнопками */}
      <section className={styles.buttons}>
        {/* Компонент для загрузки изображения */}
        <ImageInput onChange={handleImageChange} />
        {/* Текст "или" */}
        <p>или</p>
        {/* Кнопка для открытия модального окна выбора мема */}
        <Button onClick={open} classNameOfTag={styles.button}>Выбрать шаблон мема</Button>
        {/* Модальное окно выбора мема */}
        <Modal isOpen={visible} onClose={close}>
          <h2>Выбрать мем</h2>
          {/* Контейнер с мемами */}
          <div className={styles.memesContainer}>
            {/* Маппинг по массиву мемов */}
            {IMAGES.map((image: TImages) =>
              <div className={styles.memeWrapper} key={image.title} onClick={() => setImage(image.href)}>
                <h3 className={styles.memeTitle}>{image.title}</h3>
                <img className={styles.memeImage} src={image.href} alt={image.title} />
              </div>
            )}
          </div>
        </Modal>
      </section>
    </>
  );
}

export default ChooseMeme;
