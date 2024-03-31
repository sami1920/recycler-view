import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function App() {
  const [keywords, setKeywords] = useState("");
  const [items, setItems] = useState([]);
  const [showList, setShowList] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  const handleChange = (value) => {
    setKeywords(value);
  };

  const separator = () => <View style={{ height: 10 }} />;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={{ flexGrow: 1 }}>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{`${item.description}, ${item.phone}`}</Text>
        </View>
        <Text>{item.rating}</Text>
      </View>
    );
  };

  const handleSubmit = () => {
    if (name && phone && description && rating) {
      let item = {
        name: name,
        phone: phone,
        description: description,
        rating: rating,
      };
      setItems((prevItems) => [...prevItems, item]);
      setShowList(true);
    }
  };

  useEffect(() => {
    if (keywords) {
      const results = items.filter((item) => item.name.includes(keywords));
      setItems(results);
    }
  }, [keywords]);

  return (
    <View style={styles.container}>
      {showList ? (
        <SafeAreaView style={styles.subContainer}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#000" />
              <TextInput
                style={styles.searchBarInput}
                placeholder="Search"
                value={keywords}
                onChangeText={(text) => handleChange(text)}
              />
              {keywords.length > 0 && (
                <TouchableOpacity onPress={() => handleChange("")}>
                  <Ionicons name="close-circle-sharp" size={20} color="#000" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* Add Button */}
          <Pressable onPress={() => setShowList(false)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>ADD</Text>
            </View>
          </Pressable>
          {/* Flatlist */}
          <FlatList
            data={items}
            renderItem={renderItem}
            style={{ marginTop: 10 }}
            ItemSeparatorComponent={separator}
            // keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            onEndReachedThreshold={0.5}
          />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.subContainer}>
          <View style={styles.flex}>
            <Text style={styles.heading}>Add Item</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Description"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Phone"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Rating"
              value={rating}
              onChangeText={(text) => setRating(text)}
            />
            <Pressable onPress={handleSubmit}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>ADD</Text>
              </View>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#f2f2f2",
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 5,
  },
  searchBarInput: {
    color: "#000",
    alignSelf: "center",
    fontSize: 16,
    flex: 1,
  },
  button: {
    borderRadius: 16,
    backgroundColor: "brown",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  formInput: {
    borderColor: "brown",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
  },
  flex: {
    flexDirection: "column",
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  item: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
