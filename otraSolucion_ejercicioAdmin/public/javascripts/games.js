document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('name');
        const genero = document.getElementById('genero');
        const descripcion = document.getElementById('descripcion');

        fetch('/admin/games', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify({
                nombre: nombre.value,
                genero: genero.value,
                descripcion: descripcion.value
            })
        })
    });
});