import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import moment from "moment";
import { styles } from "../styles/UserCardStyles";

export default function UserCard() {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    // fetch(`http://54.198.190.149:5000/users/${window.sessionStorage.user_id}`)
    fetch(
      `http://54.198.190.149:5000/users/${window.sessionStorage.user_id}`, {
        headers: { Authorization: `Bearer ${window.sessionStorage.getItem("token")}` },}
    )
      .then((response) => response.json())
      .then((data) => {
        setuserData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.username}>{userData?.name || "John Doe 🧑‍🦰"}</Text>
        <Text style={styles.deleteButton}>Delete</Text>
      </View>
      {userData && (
        <View style={styles.content}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.detail}>{userData.email}</Text>

          <Text style={styles.label}>Height:</Text>
          <Text style={styles.detail}>{userData.height} cm</Text>

          <Text style={styles.label}>Target Weight:</Text>
          <Text style={styles.detail}>{userData.target_weight} kg</Text>

          <Text style={styles.label}>Time to Target Weight:</Text>
          <Text style={styles.detail}>
            {userData.time_to_target_weight} months
          </Text>

          <Text style={styles.label}>Daily Activity Level:</Text>
          <Text style={styles.detail}>{userData.daily_activity}</Text>

          <Text style={styles.label}>Register Date:</Text>
          <Text style={styles.detail}>
            {moment(userData.register_date).format("MMMM D, YYYY")}
          </Text>
        </View>
      )}
    </View>
  );
}
