import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import io from "socket.io-client";
import Constants from "expo-constants";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const getSocketServer = () => {
    let hostUri;

    if (Constants.manifest?.debuggerHost) {
      hostUri = Constants.manifest.debuggerHost.split(":")[0];
    } else if (Constants.expoConfig?.hostUri) {
      hostUri = Constants.expoConfig.hostUri.split(":")[0];
    } else {
      hostUri = "localhost"; // Yedek bir adres
    }

    return `http://${hostUri}:3000`;
  };

  useEffect(() => {
    const SOCKET_SERVER = getSocketServer();
    console.log(SOCKET_SERVER);
    const newSocket = io(SOCKET_SERVER);
    setSocket(newSocket);

    newSocket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, { text: `${Date.now().toString()}: ${message}`, id: Date.now().toString() }]);
    });

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== "") {
      socket.emit("send_message", inputMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `${Date.now().toString()}: ${inputMessage}`, id: Date.now().toString() },
      ]);
      setInputMessage("");
    }
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={{padding: '5'}}>Server: {(getSocketServer())}</Text>
        <View style={styles.container}>
          <FlatList
              data={messages}
              renderItem={({item}) => <Text style={styles.message}>{item.text}</Text>}
              keyExtractor={(item) => item.id}
          />
          <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Message"
            />
            <Button title="Send" onPress={sendMessage}/>
          </View>
        </View>
      </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  message: {
    padding: 8,
    color: "#e2e2e2",
    backgroundColor: "#202020",
    borderRadius: 4,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: "#fff",
  },
});

export default App;
