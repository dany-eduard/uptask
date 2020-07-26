import axios from "axios";
import Swal from "sweetalert2";

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

    if (e.target.classList.contains("fa-trash")) {
      const tareaHTML = e.target.parentElement.parentElement,
        idTarea = tareaHTML.dataset.tarea;
      const txtTarea = tareaHTML.textContent;
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar",
      })
        .then((result) => {
          if (result.value) {
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.delete(url, { params: { idTarea } }).then(function (res) {
              if (res.status === 200) {
                Swal.fire("¡Tarea eliminada!", res.data, "success");
                tareaHTML.parentElement.removeChild(tareaHTML);
              }
            });
          }
        })
        .catch(() => {
          Swal.fire(
            "Hubo un error",
            "No se pudo eliminar el proyecto",
            "error"
          );
        });
    }
  });
}

export default tareas;
