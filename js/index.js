const refs = {
  title: document.querySelector(".title"),
  field: document.querySelector("#pokemon"),
  form: document.querySelector("form"),
  article: document.querySelector("article"),
  container: document.querySelector(".container"),
};

refs.article.addEventListener("mouseover", () => {
  refs.article.style.background = getRandomColor();
});

function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

async function fetchPokemon(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const poke = await response.json();

  // if (!poke) {
  //   console.log("if");
  //   refs.form.insertAdjacentHTML(
  //     "afterend",
  //     `<p>Sorry, we didn't find this pokemon:(</p>`
  //   );

  //   return;
  // }

  const {
    name,
    sprites: {
      other: {
        home: { front_default },
      },
    },
  } = poke;

  const options = {
    name,
    front_default,
  };

  refs.container.innerHTML = addPokemonMarkup(options);
}

const addPokemonMarkup = ({ name, front_default }) => {
  return `
    <div class="article-wrapper">
      <figure>
        <img class="article-img" width="100" height="100" src="${front_default}" alt="${name}" />
      </figure>
      <div class="article-body">
        <h2>${name}</h2>
        <a target="_blank" href="https://bulbapedia.bulbagarden.net/wiki/${name}" class="read-more">
          Read more <span class="sr-only">about this is some title</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
`;
};

refs.form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetchPokemon(refs.field.value.toLowerCase());
});
