/*
function App() {
  //BASIC CRUD OPERATIONS ON FIRESTORE DB
  //CREATE NEW USER IN DB
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      age: Number(newAge),
    });
  };

  //READ FROM DB
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  //UPDATE DOCUMENT IN DB
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  //DELETE USER FROM DB
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  

  return (
    <div className="App">
      <Button text="Click" color="green" outline={false}></Button>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam massa
        nibh, consectetur et feugiat eget, sollicitudin vel leo. Cras tellus
        felis, tincidunt semper tortor et, luctus sollicitudin mauris. Curabitur
        eget ante diam.{" "}
      </p>
    </div>
  );
}
*/

//SAVE USER
//const usersCollectionRef = collection(db, "users");
/*
    const createUser = async () => {
      await addDoc(usersCollectionRef, {
        email: data.get("email"),
        password: data.get("password"),
        age: Number(data.get("age")),
        firstname: data.get("firstName"),
        lastname: data.get("lastName"),
        interest: data.get("interest"),
        location: data.get("location"),
      });
    };*/
//console.log(data);
//createUser();
//handleClick(); /*popup*/
//alert("Bruker opprettet");
//sendForward();
