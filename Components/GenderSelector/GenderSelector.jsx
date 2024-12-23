import React from "react";

const GenderSelector = ({
  selectMale = () => {},
  selectFemale = () => {},
  seelcted,
}) => {
  return (
    <div>
      {/* <TouchableOpacity
        // onPress={() => setUserValues({ ...userValues, gender: "m" })}
        onPress={() => selectMale()}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image source={userValues.gender === "m" ? maleSelected : male}></Image>
        <Text
          style={{
            marginTop: 8,
            color: Colors.Font2,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Male
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => selectFemale()}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={userValues.gender === "f" ? femaleSelected : female}
        ></Image>
        <Text
          style={{
            marginTop: 8,
            color: Colors.Font2,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Female
        </Text>
      </TouchableOpacity> */}
    </div>
  );
};

export default GenderSelector;
