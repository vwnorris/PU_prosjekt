import { Group } from "../models/Group";
import { User } from "../models/User";

// dette er bare kode for å se at testene virker (til en viss grad)
const brukere = ["bruker1", "bruker2"];

it("det skal være mulig å lage gruppe med kun seg selv uten interesser og uten beskrivelse", () => {
  const Ola = new User("Ola Nordmann", "ola123");
  const Gruppe1 = new Group("gruppe1", [], [], "", "");
  expect(Gruppe1.name).toEqual("gruppe1");
  expect(Gruppe1.interests).toEqual([]);
  expect(Gruppe1.members).toEqual([]);
  expect(Gruppe1.description).toEqual("");
  expect(Gruppe1.event).toEqual(null);
  //expect(JSON.stringify(Ola)).toEqual(JSON.stringify(Gruppe1.owner));
  //må teste at personen som lager gruppa blir eieren av gruppa
});

it("det skal være mulig å legge til folk med brukernavn som ligger i databasen", () => {
  const brukernavnList = ["bruker1", "bruker2"];
  const Gruppe1 = new Group("gruppe1", [], brukernavnList, "", "");
  expect(Gruppe1.name).toEqual("gruppe1");
  expect(Gruppe1.interests).toEqual([]);
  expect(Gruppe1.members).toEqual(["bruker1", "bruker2"]);
  expect(Gruppe1.description).toEqual("");
});

it("det skal være mulig å legge til interesser gruppen har", () => {
  const interesserList = ["sport", "uteaktiviteter"];
  const Gruppe1 = new Group("gruppe1", interesserList, [], "", "");
  expect(Gruppe1.name).toEqual("gruppe1");
  expect(Gruppe1.interests).toEqual(interesserList);
  expect(Gruppe1.members).toEqual([]);
  expect(Gruppe1.description).toEqual("");
});

it("det skal være mulig å legge til en tekstlig beskrivelse for gruppen", () => {
  const beskrivelse =
    "Vi er en gruppe ungdommer som liker å møtes for å drive med sporter. Vi liker også å være mye ute";
  const Gruppe1 = new Group("gruppe1", [], [], "", beskrivelse);
  expect(Gruppe1.name).toEqual("gruppe1");
  expect(Gruppe1.interests).toEqual([]);
  expect(Gruppe1.members).toEqual([]);
  expect(Gruppe1.description).toEqual(beskrivelse);
});
