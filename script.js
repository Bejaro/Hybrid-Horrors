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
            size: data.size,
            type: data.type,
            alignment: data.alignment,
            hitPoints: data.hit_points,
            hitPointsRoll: data.hit_points_roll,
            armorClass: data.armor_class,
            speed: {
                walk: data.speed.walk || "0 ft.",
                swim: data.speed.swim || null,
                fly: data.speed.fly || null,
                hover: data.speed.hover || null,
                burrow: data.speed.burrow || null,
                climb: data.speed.climb || null
              },
            challengeRating: data.challenge_rating
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

        //Create options in select list
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
const creatureType1 = document.getElementById("creature-type-1");
const creatureHp1 = document.getElementById("creature-hp-1");
const creatureAc1 = document.getElementById("creature-ac-1");
const creatureSpeed1 = document.getElementById("creature-speed-1");
const creatureCr1 = document.getElementById("creature-cr-1");

creatureSelect1.addEventListener("change", function() {
    //Wipe additive textcontents for each 
    creatureType1.textContent = "";
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
      //Size, type and alignment are one line
        if (creature1.size){
            creatureType1.textContent += creature1.size;
        }
        if (creature1.type){
            creatureType1.textContent += " " + creature1.type;
        }
        if (creature1.alignment){
            creatureType1.textContent += ", " + creature1.alignment;
        }
      creatureHp1.textContent = creature1.hitPoints + " (" + creature1.hitPointsRoll + ")";
      creatureAc1.textContent = creature1.armorClass;

      //Speed broken into various categories within the object
    if (creature1.speed.walk) {
        creatureSpeed1.textContent += " " + creature1.speed.walk;
    }
    if (creature1.speed.swim) {
        creatureSpeed1.textContent += ", swim " + creature1.speed.swim;
    }
    if (creature1.speed.fly) {
        creatureSpeed1.textContent += ", fly " + creature1.speed.fly;
    }
    if (creature1.speed.hover){
        creatureSpeed1.textContent += " (hover)";
    }
    if (creature1.speed.burrow) {
        creatureSpeed1.textContent += ", burrow " + creature1.speed.burrow;
    }
    if (creature1.speed.climb) {
        creatureSpeed1.textContent += ", climb " + creature1.speed.climb;
    }
      creatureCr1.textContent = " " + creature1.challengeRating;
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