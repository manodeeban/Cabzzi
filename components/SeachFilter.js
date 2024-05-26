import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const SeachFilter = ({ placeholder, mockData, onSelectItem }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showList, setShowList] = useState(true);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = mockData.filter((place) =>
      place.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setShowList(!text ? false : true);
  };

  const handleSelectItem = (item) => {
    setSearchText(item.location); // Set the selected item as the input value
    onSelectItem(item); // Call the callback function with the selected item
    setShowList(false);
  };

  return (
    <View>
      <TextInput
        style={tw`p-2 bg-gray-200 h-10 rounded-md`}
        placeholder={placeholder}
        onChangeText={handleSearch}
        value={searchText}
      />
      {showList && (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)} style={tw`bg-white`}>
              <Text style={{ padding: 10 }}>{item.location}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default SeachFilter;
