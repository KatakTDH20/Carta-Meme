const categorySelect = document.getElementById('category');
const imageOptions = document.getElementById('image-options');
const memeDisplay = document.getElementById('meme-display'); // Agregado para cambiar colores de la mitad derecha
const leftContainer = document.querySelector('.meme-creator'); // Agregado para cambiar colores de la mitad izquierda

// Objetos que contienen las imágenes por categoría
const categoryImages = {
  kaiju: [
      { value: 'kafka1', label: 'kafka 1', img: 'imagen/kafka1.jpg' },
      { value: 'kafka2', label: 'kafka 2', img: 'imagen/kafka2.jpg' },
      { value: 'kafka3', label: 'kafka 3', img: 'imagen/kafka3.jpg' }
  ],
  irumakun: [
      { value: 'iruma1', label: 'iruma 1', img: 'imagen/iruma1.jpg' },
      { value: 'iruma2', label: 'iruma 2', img: 'imagen/iruma2.jpg' },
      { value: 'iruma3', label: 'iruma 3', img: 'imagen/iruma3.jpg' }
  ],
  hdxd: [
      { value: 'issei1', label: 'issei 1', img: 'imagen/issei1.jpg' },
      { value: 'issei2', label: 'issei 2', img: 'imagen/issei2.jpg' },
      { value: 'issei3', label: 'issei 3', img: 'imagen/issei3.jpg' }
  ]
};

// Función para actualizar las imágenes y colores según la categoría seleccionada
function updateImages() {
  const selectedCategory = categorySelect.value;

  // Limpiar las opciones de imagen actuales
  imageOptions.innerHTML = '';

  // Obtener las imágenes de la categoría seleccionada
  categoryImages[selectedCategory].forEach(image => {
      const label = document.createElement('label');
      label.innerHTML = `
          <input type="radio" name="image" value="${image.value}"> 
          <img src="${image.img}" alt="${image.label}" class="image-option"> 
      `;
      imageOptions.appendChild(label);
  });

  // Cambiar colores según la categoría
  changeColors(selectedCategory);
}

// Función para cambiar colores de la mitad izquierda y de los botones
function changeColors(selectedCategory) {
  let leftBgColor, leftTextColor, titleColor, buttonColor, buttonTextColor;

  // Definición de colores según la categoría
  if (selectedCategory === "kaiju") {
      leftBgColor = "#000000"; // Color de fondo para la mitad izquierda
      leftTextColor = "#FFFFFF"; // Color del texto de la mitad izquierda
      titleColor = "#00bfff"; // Color del título
      buttonColor = "#00bfff"; // Color de los botones
      buttonTextColor = "#FFFFFF"; // Color del texto de los botones
  } else if (selectedCategory === "irumakun") {
      leftBgColor = "#6F2C91"; // Color de fondo para la mitad izquierda
      leftTextColor = "#F1C40F"; // Color del texto de la mitad izquierda
      titleColor = "#000080"; // Color del título
      buttonColor = "#000080"; // Color de los botones
      buttonTextColor = "#F1C40F"; // Color del texto de los botones
  } else if (selectedCategory === "hdxd") {
      leftBgColor = "#A52A2A"; // Color de fondo para la mitad izquierda
      leftTextColor = "#00FF00"; // Color del texto de la mitad izquierda
      titleColor = "#FF0000"; // Color del título
      buttonColor = "#FF0000"; // Color de los botones
      buttonTextColor = "#00FF00"; // Color del texto de los botones
  }

  // Aplicar los colores a los elementos de la mitad izquierda
  leftContainer.style.backgroundColor = leftBgColor;
  leftContainer.style.color = leftTextColor;

  // Aplicar los colores al título
  document.querySelector(".title").style.backgroundColor = titleColor;
  document.querySelector(".title").style.color = leftTextColor;

  // Cambiar los botones
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
      button.style.backgroundColor = buttonColor;
      button.style.color = buttonTextColor;
      button.style.borderRadius = "5px"; // Agregar borde redondeado
      button.style.margin = "0 10px"; // Separación entre botones
  });
}

// Escuchar el evento de cambio en el selector de categorías
categorySelect.addEventListener('change', function() {
  updateImages(); // Actualiza las imágenes y colores al cambiar de categoría
});

// Llamar a la función una vez al cargar la página para establecer las imágenes iniciales
updateImages();

document.getElementById('create-meme').addEventListener('click', function() {
  // Obtener valores de los inputs
  const selectedImage = document.querySelector('input[name="image"]:checked').value; // Obtener la imagen seleccionada
  const message = document.getElementById('message').value;
  const author = document.getElementById('author').value;

  // Limpiar el contenido anterior del meme
  memeDisplay.innerHTML = ''; // Limpiar contenido anterior

  const memeImage = document.createElement('img');

  // Asignar la imagen correcta según el radio seleccionado (desde la carpeta imagen)
  memeImage.src = `imagen/${selectedImage}.jpg`; // Cargar desde la carpeta 'imagen'
  memeImage.id = "meme-image"; // Asegurar que tenga el ID para aplicar los estilos CSS

  const memeMessage = document.createElement('p');
  memeMessage.textContent = message;
  memeMessage.classList.add('meme-message'); // Agregar clase para aplicar los estilos CSS

  const memeAuthor = document.createElement('p');
  memeAuthor.textContent = `Por: ${author}`;
  memeAuthor.classList.add('meme-author'); // Agregar clase para aplicar los estilos CSS

  // Añadir los nodos al div de visualización del meme
  memeDisplay.appendChild(memeImage);   // Imagen del meme
  memeDisplay.appendChild(memeMessage); // Mensaje sobre la imagen
  memeDisplay.appendChild(memeAuthor);  // Autor debajo de la imagen
});

// Función para abrir el meme en una nueva ventana
document.getElementById('generate-meme').addEventListener('click', function() {
  const newWindow = window.open('', '_blank'); // Abrir nueva ventana

  // Crear el contenido HTML para el meme
  newWindow.document.write(`
      <html>
          <head>
              <title>Meme Generado</title>
              <style>
                  body {
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      height: 100vh;
                      background-color: ${memeDisplay.style.backgroundColor || '#ffffff'};
                  }
                  img {
                      width: 80%; /* Ajusta según lo que necesites */
                      height: auto;
                  }
                  .meme-message, .meme-author {
                      color: white;
                      font-weight: bold;
                      text-align: center;
                      padding: 5px;
                      background-color: rgba(0, 0, 0, 0.5);
                      margin: 10px 0;
                  }
              </style>
          </head>
          <body>
              ${memeDisplay.innerHTML} <!-- Copiar el contenido del meme -->
          </body>
      </html>
  `);

  newWindow.document.close(); // Cierra el documento para que se renderice
});
