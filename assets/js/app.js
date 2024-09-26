const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;

// aquí se están seleccionando los elementos en el Dom
const $n = document.querySelector('.name'); // se le cambió el nombre por ".name" ya que el otro no funcionaba
const $b = document.querySelector('.blog');
const $l = document.querySelector('.location');

// esta es una función asincrona para mostrar la información del usario
async function displayUser(username) {
  try {
    $n.textContent = 'Cargando...'; // Indicador de carga
    //aquí se le está haciendo la petición a la API
    const response = await fetch(`${usersEndpoint}/${username}`);
    const data = await response.json(); //se pide que los datos estén en formato JSON

    if (response.ok) { //valida si la respuesta es correcta
      //aquí se le están asignando los datos del usuario al DOM
      $n.textContent = data.name || 'Sin nombre disponible';
      $b.textContent = data.blog || 'Sin blog disponible';
      $l.textContent = data.location || 'Sin ubicación disponible';
    } else {
      throw new Error(`Usuario no encontrado: ${response.status}`);
    }
  } catch (err) {
    handleError(err); // Lo de aquí maneja el error en caso de fallar
  }
}

//aquí está lo que el manejo de erorres hará si es que hay uno
function handleError(err) {
  console.error('Error:', err); //muestra un error en la consol
  $n.textContent = `Algo salió mal: ${err.message}`; //muestra error en el DOM
}

// ejemplo con un nombre de usuario 
displayUser('stolinski');

//al final le doy "format document" para organizarlo todo mejor
