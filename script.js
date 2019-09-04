// Create an array of pokemon
const topics = [
  `Bidoof`,
  `Cloyster`,
  `Jynx`,
  `Mareep`,
  `Mesprit`,
  `Metapod`,
  `Politoed`,
  `Slakoth`,
  `Snorlax`,
  `Squirtle`,
  `Suicune`,
  `Tangela`,
  `Venomoth`,
  `Vulpix`
];

// For Loop - Create buttons for each index of the array to populate #buttonRow
for (var topicPokemonIndex = 0; i < topics.length; topicPokemonIndex++) {
  var buttons = $(
    "<div><button data-pokemon=`topics[topicPokemonIndex]`>" +
      topics[topicPokemonIndex] +
      "</button></div>"
  );
  buttons.appendTo("#buttonRow");
}

// For Loop -  When users click on a button in #buttonRow will send a queryURL to giphy, limit of 10, no autoplay
$("#buttonRow").on("click", function() {
  const queryButton = $(this).attr("data-pokemon");
  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    queryButton +
    "&api_key=VtFYkxuLNqaMPJL3tTXdA3ekk66Q5tJg&limit=10";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Create a variable named results and set it equal to response.data
    const results = response.data;

    // For Loop - Send the response aka the results to the page in id #gifPanel

    for (const index = 0; index < results.length; index++) {
      // by creating a div (variable pokemonDiv)

      let pokemonDiv = $(`<div class=pokemonType></div>`);

      // Make a paragraph tag with jQuery and store it in a variable named p.

      let p = $(`<p></p>`);

      // Set the inner text of the paragraph to the rating of the image in results[i].

      $(`p`).text(results[i].rating);

      // Make an image tag with jQuery and store it in a variable named pokemonImage.

      let pokemonImage = $(`<img>`);

      // Set the image's src to results[i]'s fixed_height.url.

      pokemonImage.attr("src", results[i].images.fixed_height.url);

      // Append the p variable to the pokemonDiv variable.

      pokemonDiv.append(p);

      // Append the animalImage variable to the pokemonDiv variable.

      pokemonDiv.append(pokemonImage);

      // Prepend the pokemonDiv variable to the element with an id of gifPanel.

      $(`#gifPanel`).prepend(pokemonDiv);
    }
  });
});

// When users add in a search term for additional Pokemon, clicking on the #addButton will append the #searchTag (user input) as a string to the array
//  On Click event associated with the addButton
$("#addButton").on("click", function(event) {
  event.preventDefault();
  //  Get the to-do "value" from the textbox and store it a variable
  const newTopic = $("#userSearchTag")
    .val()
    .trim();
  //  Adds new topic to the topics array
  topics.push(newTopic);
});
