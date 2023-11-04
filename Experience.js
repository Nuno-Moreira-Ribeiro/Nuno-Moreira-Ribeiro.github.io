var allProjects;
const IMGsPath = "IMG/";

//récupère le informations sur les projets contenues dans le fichier json
fetch('DATA/projets.json')
  .then(response => response.json())
  .then(data => {
    allProjects = data.projects;
    let container;

    allProjects.forEach(project => {
      container = document.querySelector(`#${project.containerId}`);
      container.insertAdjacentHTML('beforeend', generateCardCode(project));

    });
    addInteractivityToCards();
  })
  .catch(error => console.error("Custom error. Can't load projects :", error));

//Génère le code pour la carte passée en paramètre
function generateCardCode(project) {
  let cardCode = `
    <div class="card">
        <div class="content">
          <p class="heading">${project.previewTitle}</p>
          <div class="card-image">
            <img src="${IMGsPath}${project.previewImg}" alt="Placeholder Image">
          </div>
          <button class="card-btn">En savoir plus</button>
        </div>
        <div class="card-expanded">
            <div class="card-expanded-image">
            <button class="close-btn">&#10006;</button>

              <img src="${IMGsPath}${project.projectImg}" alt="Placeholder Image">
            </div>
            <div class="card-expanded-content">
              <h2 class="card-expanded-title">${project.projectTitle}</h2>
              <hr id="hrTitles">
              <p class="card-expanded-text">${project.description}</p>
              <div class="card-expanded-logos">
                  ${generateCardToolsCode(project.tools)}
              </div>
              ${generateCardRetexCode(project.retexLink)}
              ${generateCardLink(project.link)}
            </div>
        </div>
      </div>
    `;
  return cardCode;
};

//Génère le code des outils utilisés (langages et logiciels)
function generateCardToolsCode(tools) {
  let toolsCode = ``;
  tools.forEach(tool => {
    toolsCode += `<img class="svg" src="${IMGsPath}${tool}" alt="${tool}" draggable="false"></img>`
  });
  return toolsCode;
}

//Génère le code du bouton du RETEX (aucun bouton si retex non disponible)
function generateCardRetexCode(retexLink) {
  let retexCode = "";

  if (retexLink != "") {
    retexCode += `
    <a href="RETEX/${retexLink}" target="_blank">
        <button class="download-btn">
            <span class="download-text">Mon retour d'expérience</span>
        </button>
    </a>
    `;
  }

  return retexCode;
}

function generateCardLink(Link) {
  let retexCode = "";

  if (Link != "") {
    retexCode += `
    <a href="${Link}" target="_blank">
        <button class="download-btn">
            <span class="download-text">Le site</span>
        </button>
    </a>
    `;
  }

  return retexCode;
}

// un popup apparait quand on clique sur une carte
function addInteractivityToCards() {
  const cards = document.querySelectorAll('.card');
  const expanded = document.querySelectorAll('.card-expanded');

  cards.forEach((card, index) => {
    const btn = card.querySelector('.card-btn');
    const close = expanded[index].querySelector('.close-btn');
    const expandedCard = expanded[index];

    btn.addEventListener('click', () => {
      expandedCard.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', () => {
      expandedCard.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  });
}
