// Импортируем стили для данной страницы из файла HomePage.module.scss
import styles from './HomePage.module.scss'

// Импортируем компоненты ChooseMeme и RefactorMeme из соответствующих файлов
import ChooseMeme from '../components/ChooseMeme/ChooseMeme'
import RefactorMeme from '../components/RefactorMeme/RefactorMeme'

// Импортируем пользовательские хуки из соответствующих файлов
import { useActive } from "../hooks/useActive"
import { useImage } from '../hooks/useImage'
import { useVisible } from '../hooks/useVisible'

// Определяем константы для местоположения мема
export const OUTSIDE_MEME = 'outside';
export const INSIDE_MEME = 'inside';

// Создаем компонент HomePage
const HomePage = () => {
  // Используем пользовательский хук useVisible для управления видимостью элементов
  const { visible, close, open } = useVisible(false)
  // Используем пользовательский хук useImage для управления изображением мема
  const { imageSrc, setImage } = useImage(null)
  // Используем пользовательский хук useActive для управления активностью кнопок
  const {state:activeButton,set:setActiveButton} = useActive('')

  // Функция обработки изменения изображения
  const handleImageChange = (src: string | null) => {
    setImage(src);
  };

  return (
    // Возвращаем JSX компонента
    <main className={styles.wrapper}>
      {/* Условное отображение компонентов ChooseMeme и RefactorMeme в зависимости от наличия изображения */}
      {!!imageSrc
        ? <RefactorMeme
          activeButton={activeButton}
          imageSrc={imageSrc}
          setActiveButton={setActiveButton}
        />
        : <ChooseMeme
          handleImageChange={handleImageChange}
          open={open}
          setImage={setImage}
          visible={visible}
          close={close}
        />
      }
    </main>
  )
}

// Экспортируем компонент HomePage по умолчанию
export default HomePage
