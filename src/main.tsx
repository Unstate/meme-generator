// Импорт React и ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'

// Импорт компонента HomePage из файла ./pages/HomePage
import HomePage from './pages/HomePage'

// Импорт главных стилей приложения из файла ./styles/main.scss
import './styles/main.scss'

// Используем метод createRoot() объекта ReactDOM, чтобы создать корневой компонент
// и вызываем render(), чтобы отрисовать компонент в указанном месте на странице
// Метод createRoot() и render() используются для активации экспериментального режима Concurrent Mode
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Оборачиваем компонент в <React.StrictMode>, чтобы выявить потенциальные проблемы в коде
  <React.StrictMode>
    {/* Рендерим компонент HomePage */}
    <HomePage />
  </React.StrictMode>,
)
