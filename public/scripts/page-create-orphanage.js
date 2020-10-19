// create map
const map = L.map('mapid').setView([-27.2016378,-49.6204644], 15);

// create and add tile layer
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' 
  ).addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 58],
  iconAnchor: [29, 68]
})

let marker;

// create and add marker on click
map.on('click', (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // remove icon
  marker && map.removeLayer(marker);
  // add icon layer
  marker = L.marker([lat, lng], { icon: icon } )
  .addTo(map);
});

// add photo field
function addPhotoField() {
  // pegar o container de photos #images
  const container = document.querySelector('#images');
  // pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll('.new-upload');
  // realizar o clone da ultima imagem adicionada
  const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
  //verificar se o campo esta vazio, se sim: não adicionar ao container de #images
  const input = newFieldContainer.children[0];
  if(input.value == ""){
    return
  }
  // limpar o campo antes de adicionar ao container #images
  input.value = "";
  // adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}

// delete photo field container
function deleteField(event) {
  const span = event.currentTarget;
 
  const fieldsContainer = document.querySelectorAll('.new-upload'); 
  if(fieldsContainer.length <= 1 ){
    // limpar o valor do campo
    span.parentNode.children[0].value = "";
    return
  }

  // deletar o campo
  span.parentNode.remove();   

}

// select yes or no
function toggleSelect(event) {
  // retirar a classe .active dos botoes
  document.querySelectorAll('.button-select button')
  .forEach(button => button.classList.remove('active'));

  // pegar o botao clicado colocar a classe .active
  const button = event.currentTarget;
  button.classList.add('active');

  // atualizar o input hidden com o valor selectionado
  const input = document.querySelector('[name="open_on_weekends"]');

  input.value = button.dataset.value
}
