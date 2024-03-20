const urlbase = "http://localhost/projects/hotel-api/";
initialGetService();

let bookings = [];
let guests = [];
let rooms = [];

async function getManyField(field) {
  const response = await fetch(`${urlbase}/${field}/lista`);
  const data = await response.json();

  if (!data) {
    return [];
  }

  return data.dado;
}

async function getOneField(field, id) {
  const response = await fetch(`${urlbase}/${field}/lista/${id}`);
  const data = await response.json();

  if (!data) {
    return {};
  }

  return data.dado;
}

async function postNewField(field, dataBody) {
  const response = await fetch(`${urlbase}/${field}/create`, {
    method: "POST",
    body: JSON.stringify(dataBody),
  });

  const data = await response.json();

  if (!data) {
    return {};
  }

  alert(data.dado);

  return data.dado;
}

async function updateField(field, id, dataBody) {
  const response = await fetch(`${urlbase}/${field}/change/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataBody),
  });
  const data = await response.json();

  if (!data) {
    return {};
  }

  console.log(data);

  return data.dado;
}

async function deleteField(field, id) {
  const response = await fetch(`${urlbase}/${field}/delete/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!data) {
    return {};
  }

  alert(data.dado);

  return data.dado;
}

async function initialGetService() {
  bookings = await getManyField("booking");
  guests = await getManyField("hotelguest");
  rooms = await getManyField("room");

  initialDash();
}
