(function(){
const appContainer = document.querySelector(".app");
let arrayNames = ["Ala", "Ola"];
let searchPhrase = "";
let isSearchFocused = false;

addName = (newName) => {
    if (!newName) return
   arrayNames = arrayNames.concat(newName);
    render();
};
searchName = (newName) => {
  newName = newName.toLowerCase();
  newArrayNames = arrayNames.map((newName) => newName.toLowerCase());
  return newArrayNames.includes(newName);
};
const removeElement = function (array, indexToRemove) {

    const head = array.slice(0, indexToRemove)
    const tail = array.slice(indexToRemove + 1)

    const newArray = head.concat(tail)

    return newArray

}

const removeName=(e)=>{
indexToRemove = arrayNames.indexOf(e.target.innerHTML);
arrayNames = removeElement(arrayNames, indexToRemove);
render();
}

const createForm = () => {
  const form = document.createElement("form");
  form.classList.add("form");
  const input = document.createElement("input");
  input.classList.add("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Add new name");
  const button = document.createElement("button");
  button.classList.add("button");
  button.innerHTML = "ADD";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      addName(input.value);
    });
  form.appendChild(input);
  form.appendChild(button);
  return form;
};

const creatSearch = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  const input = document.createElement("input");
  input.classList.add("search");
  input.setAttribute("type", "search");
  input.setAttribute("placeholder", "Search name");
  input.value = searchPhrase;
  if (isSearchFocused) {
    setTimeout(function () {
      input.focus();
    }, 0);
  }
  input.addEventListener("input", function () {
    searchPhrase = input.value;
    isSearchFocused = true;

    render();
  });

  container.appendChild(input);
  return container;
};

const renderNames = () => {
  const list = document.createElement("ul");
  list.classList.add("list");
  arrayNames.forEach((name) => {
    const item = document.createElement("li");
    item.classList.add("item");
    item.style.textTransform = "capitalize";
    item.innerHTML = name;
    item.addEventListener("click", removeName);
    item.style.cursor = "pointer";
    list.appendChild(item);
  });
  return list;
};

const renderResultSearch = () => {
  const result = document.createElement("div");
  result.classList.add("result");
  const p = document.createElement("p");
  p.classList.add("result-text");
  if (searchName(searchPhrase)) {
    p.style.color = "green";
    p.innerText = "Search phrase exists in list";
  } else {
    p.style.color = "red";
    p.innerText = "Search phrase NOT exists in list";
  }
  result.appendChild(p);

  return result;
};
const render = () => {
  if (!appContainer) {
    appContainer = document.createElement("div");
  }

  appContainer.innerHTML = "";

  appContainer.appendChild(renderNames());
  appContainer.appendChild(createForm());
  appContainer.appendChild(creatSearch());
  appContainer.appendChild(renderResultSearch());
  isSearchFocused = false;
};
render();
})()