document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  // Estado inicial
  cursos.forEach(curso => {
    if (!curso.classList.contains("bloqueado")) {
      curso.classList.add("pendiente");
    }
  });

  // Acción al hacer clic
  cursos.forEach(curso => {
    curso.addEventListener("click", () => {
      if (curso.classList.contains("bloqueado")) return;

      // Cambiar de estado visual
      if (curso.classList.contains("pendiente")) {
        curso.classList.remove("pendiente");
        curso.classList.add("en-curso");
      } else if (curso.classList.contains("en-curso")) {
        curso.classList.remove("en-curso");
        curso.classList.add("aprobado");
      } else if (curso.classList.contains("aprobado")) {
        curso.classList.remove("aprobado");
        curso.classList.add("pendiente");
      }

      // Después de cambiar estado, verificar desbloqueos
      verificarDesbloqueos();
    });
  });

  // Función para revisar cursos desbloqueables
  function verificarDesbloqueos() {
    cursos.forEach(curso => {
      if (!curso.classList.contains("bloqueado")) return;

      const requisitos = curso.dataset.requisitos;
      if (!requisitos) return;

      const lista = requisitos.split(",").map(r => r.trim());
      const cumplidos = lista.every(req => {
        const reqCurso = Array.from(cursos).find(c => c.dataset.nombre === req);
        return reqCurso && reqCurso.classList.contains("aprobado");
      });

      if (cumplidos) {
        curso.classList.remove("bloqueado");
        curso.classList.add("pendiente");
      }
    });
  }

  // Verifica desbloqueos iniciales al cargar
  verificarDesbloqueos();
});
