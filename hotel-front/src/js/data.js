const toggleThemeInner = `
  <div>
    <i class="fas fa-sun sun"></i>
    <i class="fas fa-moon moon"></i>
  </div>
  <div>
    <span class="sun">Light</span>
    <span class="moon">Dark</span>
  </div>
`;

const sideBarMenuItems = [
  {
    value: "Inicial ",
    iconClass: "fas fa-hotel",
    goTo: "mountDashBoradData()",
  },
  {
    value: "Reservas Feitas ",
    iconClass: "fas fa-book",
    goTo: "mountBookingsData()",
  },
  {
    value: "Hóspede ",
    iconClass: "fas fa-user",
    goTo: "mountHotelGuestData()",
  },
  {
    value: "Quartos ",
    iconClass: "fas fa-bed",
    goTo: "mountRoomsData()",
  },
  {
    value: "Sobre ",
    iconClass: "fas fa-info-circle",
    goTo: "mountAboutData()",
  },
];

const authors = [
  {
    name: "Afonso Pedro Kanga",
    urlImg: "./src/images/apc.jpg",
  },
  {
    name: "Eugénio Nzuzi Dombaxe",
    urlImg: "./src/images/end.jpg",
  },
  {
    name: "João Eduardo Panzo",
    urlImg: "./src/images/jep.jpg",
  },
  {
    name: "Mauro Diogo",
    urlImg: "./src/images/md.jpg",
  },
  {
    name: "Osvaldo Daniel",
    urlImg: "./src/images/od.jpg",
  },
];

function AboutContent() {
  return `
  <div class="about">
    <h1 class="logo">Novotel</h1>
    <p>
      Projecto de gereciamento de um hotel, feito como apresentação da
      prova parcelar da cadeira de programação Web
    </p>

    <h4>Criadores:</h4>
    <div class="authors">
    ${authors
      .map(({ name, urlImg }) => {
        return `
      <div class="author">
        <figure>
          <img src="${urlImg}" alt="${name}" />
        </figure>
        <em>${name}</em>
      </div>`;
      })
      .join("")}
    </div>
  </div>
  `;
}

function formCreateBooking() {
  return `
  <form class="form" onsubmit="handleCreateBooking(event)">
    <h3>Fazer a Reserva</h3>
    <div class="control-form">
      <div>
        <label for="startDate">Data de ínicio</label><br/>
        <input type="date" id="startDate" name="startDate"/>
      </div>

      <div>
        <label for="endDate">Data de Fim</label><br/>
        <input type="date" name="endDate" id="endDate"/>
      </div>
    </div>
    <br/>
    <hr/>
    <br/>
    <h4></h4>
    <div class="control-form">
      <label for="room">Quarto: </label><br/>
      <select name="room" id="room">
      ${rooms
        .map((room) => {
          return `<option value=${room.id}>${room.type} | ${room.cost}</option>`;
        })
        .join("")}
      </select>
    </div>

    <div class="control-form">
      <label for="guest">Hóspede: </label><br/>
      <select name="guest" id="guest">
      ${guests
        .map((guest) => {
          return `<option value=${guest.id_guest}>${guest.name} | ${guest.phone}</option>`;
        })
        .join("")}
      </select>
    </div>

    <button>Reservar</button>
  </form>
`;
}

function formCreateHotelGuest() {
  return `
  <form class="form" onsubmit="handleCreateHotelGuest(event)">
    <h3>Cadastrar um Hóspede</h3>
    <div class="control-form">
      <label for="name">Nome</label><br/>
      <input type="text" id="name" name="name"/>
    </div>

    
    <div class="control-form">
      <label for="bi_number">Nº BI</label><br/>
      <input type="text" id="bi_number" name="bi_number"/>
    </div>

    <div class="control-form">
      <label for="phone">Nº tel</label><br/>
      <input type="text" id="phone" name="phone"/>
    </div>

    <button>Cadastrar</button>
  </form>
`;
}

function formCreateRooms() {
  return `
  <form class="form" onsubmit="handleCreateRoom(event)">
    <h3>Cadastrar um Quartos</h3>

    <div class="control-form">
      <label for="type">Tipo de Quarto</label><br/>
      <input type="text" id="type" name="type"/>
    </div>

    <div class="control-form">
      <label for="floor">Andar</label><br/>
      <input type="number" id="floor" name="floor"/>
    </div>

    <div class="control-form">
      <label for="number">Número</label><br/>
      <input type="number" id="number" name="number"/>
    </div>

    <div class="control-form">
      <label for="bedsNumber">Número de Camas</label><br/>
      <input type="number" id="bedsNumber" name="bedsNumber"/>
    </div>

    <div class="control-form">
      <label for="cost">Custo</label><br/>
      <input type="number" id="cost" name="cost"/>
    </div>

    <button>Cadastrar</button>
  </form>
`;
}
