fetch("https://restcountries.com/v3.1/name/uk?fields=name,capital,population,languages,flags").then((function(e){return e.json()})).then((function(e){return console.log(e)})),document.querySelector("#search-box").addEventListener("input",(function(e){var n=e.target.value;console.log(n)}));
//# sourceMappingURL=index.c69e817c.js.map
