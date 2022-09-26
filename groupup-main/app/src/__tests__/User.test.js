import { User } from "../models/User";

it("det skal være mulig å opprette en bruker uten lokasjon og interesser", () => {
  const Ola = new User("Ola", 21, "Nordmann", "passord123", "", "");
  expect(Ola.firstname).toEqual("Ola");
  expect(Ola.lastname).toEqual("Nordmann");
  expect(Ola.age).toEqual(21);
  expect(Ola.password).toEqual("passord123");
  expect(Ola.location).toEqual("");
  expect(Ola.interest).toEqual("");
  //expect(JSON.stringify(Ola)).toEqual(JSON.stringify(Gruppe1.owner));
  //må teste at personen som lager gruppa blir eieren av gruppa
});

it("det skal være mulig å opprette en bruker", () => {
  const Ola = new User(
    "Ola",
    21,
    "Nordmann",
    "passord123",
    "Møllenberg",
    "Sport"
  );
  expect(Ola.firstname).toEqual("Ola");
  expect(Ola.lastname).toEqual("Nordmann");
  expect(Ola.age).toEqual(21);
  expect(Ola.password).toEqual("passord123");
  expect(Ola.location).toEqual("Møllenberg");
  expect(Ola.interest).toEqual("Sport");
  //expect(JSON.stringify(Ola)).toEqual(JSON.stringify(Gruppe1.owner));
  //må teste at personen som lager gruppa blir eieren av gruppa
});
