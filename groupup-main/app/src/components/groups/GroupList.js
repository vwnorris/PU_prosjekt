import GroupAvatar from "./GroupAvatar";
import AddGroup from "./AddGroup";
import { useState, useEffect } from "react";
import db, { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../../utils/functions";
import { collection, getDoc, getDocs } from "firebase/firestore";
import Grid from "@mui/material/Grid";
import friends from "./../../assets/img/friends.jpg";

const GroupCarousel = () => {
  // My groups
  const [user, loading, error] = useAuthState(auth); // get user token from website
  const [myGroupList, setMyGroupList] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (user) {
      // Fetches groups based on user
      fetchUser(user).then((data) => {
        data.myGroups.map((d) => {
          // Get each group
          getDoc(d).then((group) => {
            // Set groups, oldarr= oldarray
            setMyGroupList((oldarr) => [...oldarr, group.data()]);
          });
        });
      });
    }
  }, [user, loading]);

  return (
    <div>
      <div className="avatar-container">
        <h3>Mine grupper</h3>
        <Grid container spacing={0}>
          {myGroupList &&
            myGroupList.map((object, i) => (
              <Grid item xs={3} key={object.name}>
                <GroupAvatar
                  name={object.name}
                  key={i}
                  link={object.pic ? object.pic : friends}
                />
              </Grid>
            ))}
          <AddGroup />
        </Grid>
      </div>
    </div>
  );
};
export default GroupCarousel;
