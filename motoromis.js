// ---- CARRUSEL FUNCIONAL ----
const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

if (slider && prev && next) {
  let scrollStep = 270; // ancho de desplazamiento (ajústalo si tus tarjetas son más grandes)

  next.addEventListener('click', () => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      // Si llega al final, vuelve al inicio
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
    }
  });

  prev.addEventListener('click', () => {
    if (slider.scrollLeft === 0) {
      // Si está al inicio, vuelve al final
      slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    }
  });
}

// ---- CARRITO ----
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const contadorCarrito = document.getElementById('contador-carrito');
const carritoIcono = document.getElementById('carrito-icono');

let carrito = [];
let historial = [];

addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const card = btn.parentElement;
    const nombre = card.querySelector('h3').innerText;
    const precioTexto = card.querySelector('.precio').innerText;
    const precio = parseFloat(precioTexto.replace('$', ''));

    carrito.push({ nombre, precio });
    contadorCarrito.textContent = carrito.length;

    // Efecto visual de carrito animado
    const clone = card.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${card.getBoundingClientRect().left}px`;
    clone.style.top = `${card.getBoundingClientRect().top}px`;
    clone.style.width = '150px';
    clone.style.transition = 'all 1s ease';
    clone.style.zIndex = '9999';
    clone.style.opacity = '0.8';
    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = `${carritoIcono.getBoundingClientRect().left}px`;
      clone.style.top = `${carritoIcono.getBoundingClientRect().top}px`;
      clone.style.width = '20px';
      clone.style.opacity = '0';
    }, 100);

    setTimeout(() => {
      document.body.removeChild(clone);
    }, 1000);
  });
});

// ---- POPUP DEL CARRITO ----
carritoIcono.addEventListener('click', () => {
  let popup = document.getElementById('carrito-popup');

  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'carrito-popup';
    popup.classList.add('carrito-popup');
    document.body.appendChild(popup);
  }

  const total = carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2);

  popup.innerHTML = `
    <h3>🛒 Tu carrito</h3>
    <ul>
      ${carrito.length
        ? carrito.map((item) => `<li>${item.nombre} - $${item.precio.toFixed(2)}</li>`).join('')
        : '<li>No hay productos en el carrito.</li>'}
    </ul>
    <p><strong>Total:</strong> $${total}</p>
    <button id="ver-historial">Ver historial</button>
    <button id="vaciar-carrito">Vaciar carrito</button>
    <div class="historial" id="historial"></div>
  `;

  // Mostrar u ocultar popup
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';

  // ---- BOTÓN VACIAR ----
  const btnVaciar = document.getElementById('vaciar-carrito');
  btnVaciar.addEventListener('click', () => {
    if (carrito.length > 0) {
      historial.push({
        fecha: new Date().toLocaleString(),
        items: [...carrito],
        total: total,
      });
    }
    carrito = [];
    contadorCarrito.textContent = '0';
    popup.style.display = 'none';
  });

  // ---- BOTÓN HISTORIAL ----
  const btnHistorial = document.getElementById('ver-historial');
  btnHistorial.addEventListener('click', () => {
    const historialDiv = document.getElementById('historial');
    if (historialDiv.style.display === 'block') {
      historialDiv.style.display = 'none';
    } else {
      historialDiv.style.display = 'block';
      historialDiv.innerHTML = `
        <h4>🕓 Historial de compras</h4>
        ${historial.length
          ? historial.map(
              (h) =>
                `<div>
                  <p><strong>${h.fecha}</strong></p>
                  <ul>${h.items.map((i) => `<li>${i.nombre} - $${i.precio}</li>`).join('')}</ul>
                  <p>Total: $${h.total}</p>
                </div><hr>`
            ).join('')
          : '<p>No hay historial aún.</p>'}
      `;
    }
  });
});

let navMenu= document.querySelector('.nav-links')

window.addEventListener("resize", () =>{
    if(window.innerWidth>768){
      navMenu.classList.remove('show')
    }
})

// ---- MENÚ DESPLEGABLE RESPONSIVO ----
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-links-movile');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que se cierre inmediatamente
      navMenu.classList.toggle('show');
    });

    // Cierra el menú si haces clic fuera de él
    document.addEventListener('click', (e) => {
      console.log("Estoy aqui", navMenu.classList.remove('show'))

      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        ;
      }
    });

    // Cierra el menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
  }
});


