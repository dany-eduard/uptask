import axios from "axios";
const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle-o")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      /** Request hacia  /tareas/:id */
      const url = `${location.origin}/tareas/${idTarea}`;
      axios.patch(url, { idTarea }).then(function (res) {
        if (res.status === 200) {
          icono.classList.toggle("completo");
        }
      });
    }
  });
}

export default tareas;
