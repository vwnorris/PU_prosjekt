export class Group {
  constructor(
    name,
    interests,
    members,
    location,
    description,
    event = null,
    matches = []
  ) {
    this.name = name;
    this.interests = interests;
    this.members = members;
    this.location = location;
    this.description = description;
    this.event = event;
    this.matches = matches;
  }

  toString() {
    return (
      this.name +
      ",\n Interesser:" +
      this.interests +
      ",\n Medlemmer: " +
      this.members +
      ",\n Lokasjon: " +
      this.location +
      ",\n Beskrivelse: " +
      this.description +
      ",\n Møte: " +
      this.event
    );
  }

  addMatch(group) {
    if (!this.matches.includes(group)) {
      this.matches.push(group);
    } else {
      console.log("Already a match between these groups");
    }
  }

  removeMatch(group) {
    //todos = data.filter(x => x.id !== id)
    if (this.matches.includes(group)) {
      this.matches.filter((g) => g.name !== this.matches.name);
    } else {
      console.log("No match between these groups");
    }
  }
}

// Firestore data converter
export const groupConverter = {
  toFirestore: (group) => {
    return {
      name: group.name,
      interests: group.interests,
      members: group.members,
      location: group.location,
      description: group.description,
      event: group.event,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Group(
      data.name,
      data.interests,
      data.members,
      data.location,
      data.description,
      data.event
    );
  },
};
