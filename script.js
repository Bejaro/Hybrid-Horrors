const apiUrl = "https://www.dnd5eapi.co";

fetch(apiUrl + "/api/monsters")
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
            url: creature.url,
            name: creature.name,
            hitPoints: data.hit_points,
            armorClass: data.armor_class,
            speed: {
                walk: data.speed.walk || null,
                swim: data.speed.swim || null,
                fly: data.speed.fly || null,
                burrow: data.speed.burrow || null,
                climb: data.speed.climb || null
              },
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

        validCreatures.forEach(creature => {
            const option = document.createElement("option");
            option.value = creature.url;
            option.textContent = creature.name;
        creatureSelectOne.appendChild(option);
        });
        validCreatures.forEach(creature => {
            const option = document.createElement("option");
            option.value = creature.url;
            option.textContent = creature.name;
        creatureSelectTwo.appendChild(option);
        });
const creatureSelect1 = document.getElementById("creature-select-1");
const creatureName1 = document.getElementById("creature-name-1");
const creatureHp1 = document.getElementById("creature-hp-1");
const creatureAc1 = document.getElementById("creature-ac-1");
const creatureSpeed1 = document.getElementById("creature-speed-1");
const creatureCr1 = document.getElementById("creature-cr-1");

creatureSelect1.addEventListener("change", function() {
    creatureSpeed1.textContent = "";
    const selectedCreature1 = creatureSelect1.value;
    console.log(selectedCreature1);
    if (selectedCreature1 === "") {
      creatureName1.textContent = "";
      creatureHp1.textContent = "";
      creatureAc1.textContent = "";
      creatureSpeed1.textContent = "";
      creatureCr1.textContent = "";
    } else {
      const creature1 = validCreatures.find(creature => creature.url === selectedCreature1);
      creatureName1.textContent = creature1.name;
      creatureHp1.textContent = creature1.hitPoints;
      creatureAc1.textContent = creature1.armorClass;
    if (creature1.speed.walk) {
        creatureSpeed1.textContent += "Walk: " + creature1.speed.walk;
    }
    if (creature1.speed.swim) {
        creatureSpeed1.textContent += " Swim: " + creature1.speed.swim;
    }
    if (creature1.speed.fly) {
        creatureSpeed1.textContent += " Fly: " + creature1.speed.fly;
    }
    if (creature1.speed.burrow) {
        creatureSpeed1.textContent += " Burrow: " + creature1.speed.burrow;
    }
    if (creature1.speed.climb) {
        creatureSpeed1.textContent += " Climb: " + creature1.speed.climb;
    }
      creatureCr1.textContent = "Challenge Rating: " + creature1.challengeRating;
    }
});
      })
      .catch(error => {
        console.error("Error fetching creature data", error);
      });
  })
  .catch(error => {
    console.error("Error fetching creatures", error);
  });