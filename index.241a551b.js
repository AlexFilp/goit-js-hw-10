fetch("https://restcountries.com/v3.1/name/uk?fields=name,capital,population,languages,flags").then((e=>e.json())).then((e=>console.log(e)));({formInput:document.querySelector("#search-box")}).formInput.addEventListener("input",(function(e){const t=e.target.value;console.log(t)}));
//# sourceMappingURL=index.241a551b.js.map
