import Group from "./Group";

export class User {
  constructor(firstname, age, lastname, password, location, interest) {
    this.firstname = firstname;
    this.age = age;
    this.lastname = lastname;
    this.password = password;
    this.location = location;
    this.interest = interest;
    this.groups = [];
  }
  toString() {
    return this.firstname + ", " + this.lastname + ", " + this.age;
  }

  addGroupToUser(group) {
    if (!this.groups.includes(group)) this.groups.push(group);
  }
}

// Firestore data converter
export const userConverter = {
  toFirestore: (user) => {
    return {
      firstname: user.firstname,
      age: user.age,
      lastname: user.lastname,
      password: user.password,
      location: user.location,
      interest: user.interest,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.firstname,
      data.age,
      data.lastname,
      data.password,
      data.location,
      data.interest
    );
  },
};
