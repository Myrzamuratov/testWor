function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target
        .querySelector(".paralax_elem")
        .classList.add("new_position");
    } else {
      change.target
        .querySelector(".paralax_elem")
        .classList.remove("new_position");
    }
  });
}

let options = {
  threshold: [0.5],
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".next_elem");

elements.forEach((elm) => observer.observe(elm));

function parallaxEffect(options) {
  const element = document.querySelector(options.element);
  const intensity = options.intensity || 0.5;
  const radius = options.radius || 150; // Радиус прозрачной области вокруг курсора

  // Обработка движения мыши
  document.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distX = mouseX - centerX;
    const distY = mouseY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    let opacity = 1;

    if (distance < radius) {
      opacity = 1 - intensity * (1 - distance / radius);
    }

    element.style.opacity = opacity.toString();
  });

  // Восстановление прозрачности при уходе курсора с элемента
  element.addEventListener("mouseleave", () => {
    element.style.opacity = "1";
  });
}

// Использование функции
parallaxEffect({
  element: ".paralax_elem", // Целевой элемент
  intensity: 0.5, // Интенсивность эффекта (0.5 = 50% прозрачность вблизи курсора)
  radius: 150, // Радиус прозрачной области вокруг курсора
});
