const apiUrl = "https://www.dnd5eapi.co/api/";

fetch(apiUrl + "monsters")
  .then(response => response.json())
  .then(data => {
    const creatures = data.results.map(result => ({
      name: result.name,
      url: result.url
    }));
    console.log(creatures);

    // make additional requests for each creature and add them to an array
    const creatureDataPromises = creatures.map(creature => {
      return fetch(apiUrl + creature.url)
        .then(response => response.json())
        .then(data => {
          const newCreature = {
            name: creature.name,
            hitPoints: data.hit_points,
            armorClass: data.armor_class,
            speed: data.speed,
            challengeRating: data.challenge_rating
            // add more properties as needed
          };
          return newCreature;
        })
        .catch(error => {
          console.error(`Error fetching data for ${creature.name}`, error);
          return null;
        });
    });

    Promise.all(creatureDataPromises)
      .then(creaturesWithStats => {
        // remove any creatures that had errors or were not found
        const validCreatures = creaturesWithStats.filter(creature => creature !== null);
        console.log(validCreatures);
        const creatureSelectTwo = document.getElementById("creature-select-2");
        const creatureSelectOne = document.getElementById("creature-select-1");

        creatures.forEach(creature => {
            const option = document.createElement("option");
            option.value = creature.url;
            option.textContent = creature.name;
        creatureSelectOne.appendChild(option);
        });
        creatures.forEach(creature => {
            const option = document.createElement("option");
            option.value = creature.url;
            option.textContent = creature.name;
        creatureSelectTwo.appendChild(option);
        });
      })
      .catch(error => {
        console.error("Error fetching creature data", error);
      });
  })
  .catch(error => {
    console.error("Error fetching creatures", error);
  });



