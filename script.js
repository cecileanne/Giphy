// Run this to make the buttons - should be at the top and close at the very bottom
$(document).ready(function() {
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

  // Received errors if placed above the array
  initializeTopicButtons();

  // Function to intialize the page
  function initializeTopicButtons() {
    // For Loop - Create buttons for each index of the array to populate #buttonRow
    $("#buttonRow").empty();
    for (
      var topicPokemonIndex = 0;
      topicPokemonIndex < topics.length;
      topicPokemonIndex++
    ) {
      let buttonHTML =
        "<button class='topicButton'>" +
        topics[topicPokemonIndex] +
        "</button>";
      $(".topicButton").attr("data-pokemon", topics[topicPokemonIndex]),
        $(buttonHTML).appendTo("#buttonRow");
    }
  }

  // For Loop -  When users click on a button in #buttonRow will send a queryURL to giphy, limit of 10, no autoplay
  $(document).on("click", `.topicButton`, function() {
    let userInput = $(this).text();
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      userInput +
      "&api_key=VtFYkxuLNqaMPJL3tTXdA3ekk66Q5tJg&limit=10";
    // console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // Create a variable named results and set it equal to response.data
      const results = response.data;

      // For Loop - Send the response aka the results to the page in id #gifPanel
      for (let index = 0; index < results.length; index++) {
        // by creating a div (variable pokemonDiv)
        let pokemonDiv = $(`<div>`);
        // Make a paragraph tag with jQuery and store it in a variable named p.
        let p = $(`<p></p>`);
        // Set the inner text of the paragraph to the rating of the image in results[i].
        $(`p`).text(`Rating: ` + results[index].rating);
        // Make an image tag with jQuery and store it in a variable named pokemonImage.
        let pokemonImage = $(`<img class="imageCall">`);
        // Set the image's src to results[i]'s fixed_height.url (but use still since we want to do on click).
        pokemonImage
          .attr("data-animated", results[index].images.fixed_height.url)
          .attr("alt", "animated pokemon")
          .attr("src", results[index].images.fixed_height_still.url)
          .attr("data-still", results[index].images.fixed_height_still.url)
          .attr("alt", "still pokemon")
          .attr("data-state", "still");
        // Append the p variable to the pokemonDiv variable.
        pokemonDiv.append(p);
        // Append the animalImage variable to the pokemonDiv variable.
        pokemonDiv.append(pokemonImage);
        // Prepend the pokemonDiv variable to the element with an id of gifPanel.
        $(`#gifPanel`).prepend(pokemonDiv);
      }
    });
  });
  // }
  // When users click on a still image back on and off - on click should toggle between results[index].images.fixed_height_still.url and results[index].images.fixed_height.url
  $(document).on("click", `.imageCall`, function() {
    // TO DO: console.log this to verify this
    //  console.log($(this));
    if ($(this).attr("data-state") == "still") {
      $(this)
        .attr("src", $(this).attr("data-animated"))
        .attr("data-state", "animated")
        .attr("alt", "animated pokemon");
    } else {
      $(this)
        .attr("src", $(this).attr("data-still"))
        .attr("data-state", "still")
        .attr("alt", "still pokemon");
    }
  });

  // // When users add in a search term for additional Pokemon, clicking on the #addButton will append the #searchTag (user input) as a string to the array
  // //  On Click event associated with the addButton
  $("#addButton").on("click", function(event) {
    event.preventDefault();
    //  Get user's "value" from the textbox and store it a variable
    const newTopic = $("#userSearchTag")
      .val()
      .trim();
    //  Adds new topic to the topics array
    topics.push(newTopic);
    initializeTopicButtons();
    //  Clear the #userSearchTag
    $("#userSearchTag").val("");
  });
});
