const btn = document.querySelector('.button');

document.querySelector('.button').addEventListener('click', function result() {
    let width = window.screen.width;
    let height = window.screen.height;
    alert(`Размер экрана: ширина - ${width}px, высота - ${height}px.`);
})