import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");
if (btnEliminar) {
  btnEliminar.addEventListener("click", (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;
    /* console.log(urlProyecto); */

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        //Enviar petición a axios
        const url = `${location.origin}/proyectos/${urlProyecto}`;
        axios
          .delete(url, { params: { urlProyecto } })
          .then(function (res) {
            console.log(res);
            Swal.fire("¡Eliminado!", res.data, "success");
            setTimeout(() => {
              window.location.href = "/"; //Redireccionar al cliente al home
            }, 3000);
          })
          .catch(() => {
            Swal.fire(
              "Hubo un error",
              "No se pudo eliminar el proyecto",
              "error",
            );
          });
      }
    });
  });
}
export default btnEliminar;
