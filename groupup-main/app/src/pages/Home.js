import "./../assets//styles/home.css";
import GroupList from "../components/groups/GroupList";

const Home = () => {
  return (
    <div className="w-full pt-8">
      <div className="content-home w-6/7">
        <GroupList />
      </div>
    </div>
  );
};

export default Home;
