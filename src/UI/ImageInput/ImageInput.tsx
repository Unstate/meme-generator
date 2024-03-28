// Импортируем необходимые хуки и компоненты из React
import { ChangeEvent, useRef } from 'react';

// Импортируем пользовательский хук useImage из файла '../../hooks/useImage'
import { useImage } from '../../hooks/useImage';

// Импортируем компонент Button из файла '../Button/Button'
import Button from '../Button/Button';

// Определяем тип свойств компонента ImageInput
type ImageInputProps = {
  onChange: (src: string | null) => void; // Функция обратного вызова для изменения изображения
}

// Создаем функциональный компонент ImageInput
const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  // Используем пользовательский хук useImage для управления изображением
  const { setImage } = useImage(null);
  
  // Создаем ссылку на DOM-элемент input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обработчик изменения файла
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      onChange(null);
    }
  };

  // Обработчик клика по кнопке для вызова события click на элементе input
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Вызываем метод click() на элементе input
    }
  };

  // Возвращаем JSX компонента
  return (
    <>
      {/* Скрытый input для загрузки файла */}
      <input
        ref={fileInputRef} // Привязываем созданную ссылку к элементу
        type="file" // Указываем тип input как file
        accept="image/*" // Указываем, что принимаем только изображения
        onChange={handleFileChange} // Обработчик изменения файла
        style={{ display: 'none' }} // Скрываем input
      />
      {/* Кнопка для загрузки изображения */}
      <Button onClick={handleButtonClick}>Загрузить изображение</Button>
    </>
  );
};

// Экспортируем компонент ImageInput по умолчанию
export default ImageInput;
