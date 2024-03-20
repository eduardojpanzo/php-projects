const modalOverlay = document.querySelector(".modal-overlay");

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape" && isModalOpen()) {
    closeModal();
  }
});

function createNewField(type) {
  const formCreateStruture = {
    booking: formCreateBooking(),
    hotelguest: formCreateHotelGuest(),
    room: formCreateRooms(),
  };

  modalOverlay.querySelector(".modal-content").innerHTML =
    formCreateStruture[type];
  openModal();
}

function toggleTheme() {
  document.querySelector("html").classList.toggle("dark");
}

function openModal() {
  modalOverlay.classList.add("open");
}

function closeModal() {
  modalOverlay.classList.remove("open");
}

function isModalOpen() {
  return modalOverlay.classList.contains("open");
}

function setMenuItems() {
  document.querySelector(".menu-items").innerHTML = "";
  sideBarMenuItems.map((item) => {
    document.querySelector(".menu-items").innerHTML += `
        <li class="item" onclick="${item.goTo}">
            <i class="${item.iconClass}"></i>
            <span>${item.value}</span>
        </li>
    `;
  });
}

function mountSideBar() {
  document.querySelector(".switch-theme").innerHTML = toggleThemeInner;
  setMenuItems();
}

function mountDashBoradData() {
  document.querySelector(".main-content .main-header").innerHTML = `
    <h2><i class="fas fa-hotel"></i> DashBord</h2>`;

  const dashData = [
    { title: "Reservas Feitas", qtd: bookings.length },
    { title: "Número de Hóspede", qtd: guests.length },
    { title: "Quartos", qtd: rooms.length },
  ];

  document.querySelector(".content").innerHTML = `
  <div class="dashboard"></div>`;

  dashData.map((item) => {
    document.querySelector(".content .dashboard").innerHTML += `
        <div class="dashitem">
          <h3>${item.title}</h3>
          <p>${item.qtd}</p>
        </div>
    `;
  });
}

function mountBookingsData() {
  document.querySelector(".main-content .main-header").innerHTML = `
    <h2><i class="fas fa-book"></i> Reservar</h2>
    <button onclick="createNewField('booking')">Nova +</button>`;

  document.querySelector(".content").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Quarto</th>
        <th>hóspede</th>
        <th>Desde</th>
        <th>Até</th>
        <th>Opção</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
  `;

  bookings.map(
    ({ id_booking, type, number, name, phone, startDate, endDate }) => {
      document.querySelector(".content tbody").innerHTML += `
        <tr  data-key="${id_booking}">
            <td>${type} | ${number}</td>
            <td>${name} | ${phone}</td>
            <td>${startDate}</td>
            <td>${endDate}</td>
            <td><button onclick="handleDeleteBooking(${id_booking})">Excluir</button></td>
        </tr>
    `;
    }
  );
}

function mountHotelGuestData() {
  document.querySelector(".main-content .main-header").innerHTML = `
    <h2><i class="fas fa-user"></i> Hóspede</h2>
    <button onclick="createNewField('hotelguest')">Novo +</button>`;

  document.querySelector(".content").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Número de Telefone</th>
        <th>Indentificação</th>
        <th>Opção</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
  `;

  guests.map((guest) => {
    document.querySelector(".content tbody").innerHTML += `
        <tr  data-key="${guest.id_guest}">
            <td>${guest.name}</td>
            <td>${guest.phone}</td>
            <td>${guest.bi_number}</td>
            <td><button onclick="handleDeleteHotelGuest(${guest.id_guest})">Excluir</button></td>
        </tr>
    `;
  });
}

function mountRoomsData() {
  document.querySelector(".main-content .main-header").innerHTML = `
    <h2><i class="fas fa-bed"></i> Quartos</h2>
    <button onclick="createNewField('room')">Nova +</button>`;

  document.querySelector(".content").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Número</th>
        <th>Andar</th>
        <th>Camas</th>
        <th>Tipo</th>
        <th>Custo</th>
        <th>Opção</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
    </table>
  `;

  rooms.map((room) => {
    document.querySelector(".content tbody").innerHTML += `
        <tr  data-key="${room.id}">
            <td>${room.number}</td>
            <td>${room.floor}</td>
            <td>${room.bedsNumber}</td>
            <td>${room.type}</td>
            <td>${room.cost}</td>
            <td><button onclick="handleDeleteRoom(${room.id})">Excluir</button></td>
        </tr>
    `;
  });
}

function mountAboutData() {
  document.querySelector(".main-content .main-header").innerHTML = `
    <h2 class="subtitle"><i class="fas fa-info-circle"></i> Sobre</h2>`;

  document.querySelector(".content").innerHTML = AboutContent();
}

async function handleCreateBooking(e) {
  e.preventDefault();

  const bookingData = {
    startDate: e.target.startDate.value,
    endDate: e.target.endDate.value,
    room: e.target.room.value,
    guest: e.target.guest.value,
  };

  await postNewField("booking", bookingData);

  window.location.reload();
}

async function handleDeleteBooking(id) {
  await deleteField("booking", id);

  window.location.reload();
}

async function handleCreateHotelGuest(e) {
  e.preventDefault();

  const guestData = {
    name: e.target.name.value,
    phone: e.target.phone.value,
    bi_number: e.target.bi_number.value,
  };

  await postNewField("hotelguest", guestData);

  window.location.reload();
}

async function handleDeleteHotelGuest(id) {
  await deleteField("hotelguest", id);

  window.location.reload();
}

async function handleCreateRoom(e) {
  e.preventDefault();

  const roomData = {
    floor: e.target.floor.value,
    number: e.target.number.value,
    bedsNumber: e.target.bedsNumber.value,
    type: e.target.type.value,
    cost: e.target.cost.value,
  };

  await postNewField("room", roomData);

  window.location.reload();
}

async function handleDeleteRoom(id) {
  await deleteField("room", id);

  window.location.reload();
}

function initialDash() {
  mountSideBar();
  mountDashBoradData();
}
