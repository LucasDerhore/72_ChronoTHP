const apiKey = process.env.API_KEY;

const PageList = (argument = "") => {
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "&search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          response.results.forEach((article) => {
            console.log(article);
            articles += `
              <div class="cardGame">
                <img src="${article.background_image}" alt="game image">
                <h1>${article.name}</h1>
                
                <div class="overview">
                  <h3>${article.name}</h3>
                  <h1>${article.rating_top}</h1>
                  <p>Rating: ${article.metacritic}</p>
                    <a href = "#pagedetail/${article.slug}">${article.slug}</a>
                </div>
              </div>
            `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
      let nextPage = fetch;
    };

    fetchList(
      `https://api.rawg.io/api/games?key=${apiKey}`,
      cleanedArgument + "&page_size=9"
    );
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { PageList };
