import GroupCard from "../groups/GroupCard";
import db, { auth } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import React from "react";
import useNotOnStartEffect from "../../utils/useNotOnStartEffect";
import friends from "./../../assets/img/friends.jpg";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchUser } from "../../utils/functions";
import { getDoc, collection, getDocs } from "firebase/firestore";
import { compareAsc, compareDesc, parseISO } from "date-fns";

const Result = (props) => {
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
  const [groups, setGroups] = useState([]);
  const groupsCollectionRef = collection(db, "groups");
  useEffect(() => {
    const getGroups = async () => {
      const data = await getDocs(groupsCollectionRef);
      setGroups(
        data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((group) => !myGroupNames.includes(group.name))
      );
    };
    getGroups();
  }, [myGroupNames]);

  // Props
  const interest = props.interest;
  const location = props.location;
  const date = props.date;
  const age = props.age;
  const groupSize = props.groupSize;

  // Group state
  const [filteredGroups, setFilteredGroups] = useState([]);

  useNotOnStartEffect(() => {
    const filterGroups = () => {
      let tempGroups = [];
      for (let i = 0; i < groups.length; i++) {
        if (groups[i].ageRange) {
          if (
            interest == "" ||
            interest == null ||
            groups[i].interests.includes(interest)
          ) {
            if (
              location == "" ||
              location == null ||
              groups[i].location == location
            ) {
              if (
                date[1] == "" ||
                date[1] == null ||
                ((compareAsc(parseISO(groups[i].event), date[0]) === 1 ||
                  compareAsc(parseISO(groups[i].event), date[0]) === 0) &&
                  (compareDesc(parseISO(groups[i].event), date[1]) === 1 ||
                    compareDesc(parseISO(groups[i].event), date[1]) === 0))
              ) {
                if (
                  groups[i].ageRange[0] >= age[0] &&
                  groups[i].ageRange[1] <= age[1]
                ) {
                  if (
                    groups[i].members.length >= groupSize[0] &&
                    groups[i].members.length <= groupSize[1]
                  ) {
                    tempGroups.push(groups[i]);
                  }
                }
              }
            }
          }
        }
      }
      setFilteredGroups(tempGroups);
    };
    filterGroups();
  }, [interest, date, age, location, groupSize, groups]);

  return filteredGroups.map((group) => (
    <Grid item xs={4} key={group.name}>
      <GroupCard
        groupName={group.name}
        description={group.description}
        interest={group.interests}
        groupSize={group.members.length}
        event={group.event}
        location={group.location}
        match={group.match}
        leader={group.members[0]}
        pic={group.pic ? group.pic : friends}
      />
    </Grid>
  ));
};

export default Result;
