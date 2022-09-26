import EventCard from "../events/EventCard";
import { useEffect, useState } from "react";
import db, { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../../utils/functions";
import { getDoc, collection, getDocs } from "firebase/firestore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import GroupAttribute from "../groups/GroupAttribute";
import StarRating from "../StarRating";

const Result = () => {
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

  const [myGroupNames, setMyGroupNames] = useState([]);
  useEffect(() => {
    if (myGroupList.length !== 0) {
      setMyGroupNames(myGroupList.map((group) => group.name));
    }
  }, [myGroupList]);

  //All groups
  const [allGroups, setAllGroups] = useState([]);
  const groupsCollectionRef = collection(db, "groups");
  useEffect(() => {
    const getGroups = async () => {
      const data = await getDocs(groupsCollectionRef);
      setAllGroups(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((group) => myGroupNames.includes(group.match))
      );
    };
    getGroups();
  }, [myGroupNames]);

  const ShowNoGroups = () => {
    if (allGroups.length === 0) {
      return (
        <div>
          <div className="pt-4 pb-4">Du har ingen matcher 💔</div>
          <div>Gå til Finn gruppe for å planlegge noe sosialt!</div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const ShowNoMyGroups = () => {
    if (myGroupList.length === 0) {
      return (
        <div className="pt-4 pb-4">Du har ingen events i denne kategorien</div>
      );
    } else {
      return <></>;
    }
  };

  const MyGroupEvents = () => {
    return (
      <>
        <Grid container spacing={0}>
          <ShowNoMyGroups />
          {myGroupList &&
            myGroupList
              .filter((group) => group.event !== null)
              .map((group, i) => (
                <Grid item xs={4} key={i}>
                  <EventCard
                    groupName1={group.name}
                    groupName2={group.match}
                    date={group.event}
                    location={group.location}
                  />
                </Grid>
              ))}
        </Grid>
      </>
    );
  };

  const MatchWithoutDate = (props) => {
    let date = props.date;
    if (date) {
      return (
        <>
          <Typography variant="body1" component="div" className="m-1 p-1">
            <p>Dere skal på date...</p>
            <div className="p-0 pb-1 ml-0 mr-0 flex justify-left max-w-max items-center border-b-1">
              <GroupAttribute text={props.date} type="calendar" />
              <GroupAttribute text={props.location} type="location" />
            </div>
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography variant="body1" component="div" className="m-1 p-1">
            <p>Dere har ikke satt dato enda</p>
          </Typography>
        </>
      );
    }
  };

  const MyMatches = () => {
    return (
      <>
        <Grid container spacing={0}>
          <ShowNoGroups />
          {allGroups &&
            allGroups.map((group) => (
              <Grid item xs={4} key={group.name}>
                <div className="p-5">
                  <Card sx={{ maxWidth: 250 }}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <div className="p-0 pb-1 ml-0 mr-0 flex justify-left max-w-max items-center border-b-1"></div>
                      <Typography
                        variant="body1"
                        component="div"
                        className="m-1 p-1"
                      >
                        <p>Du har matchet med...</p>
                        <FavoriteIcon fontSize="small" color="secondary" />
                        <h4>{group.name}</h4>
                      </Typography>
                      <MatchWithoutDate
                        date={group.event}
                        location={group.location}
                      />
                      <StarRating name={group.name} />
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
        </Grid>
      </>
    );
  };

  return (
    <>
      <Container>
        <h3>Mine events</h3>
        <MyGroupEvents />
      </Container>
      <Container>
        <h3>Mine matcher</h3>
        <MyMatches />
      </Container>
    </>
  );
};

export default Result;
