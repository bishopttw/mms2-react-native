import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View, Image, ImageBackground } from 'react-native';
import Todo from "./components/Todo";
import { SafeAreaView } from 'react-native'; // ✅ FIXED IMPORT

export default function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0); // ✅ FIXED: Use state for counter

  function handleInputChange(text) {
    setNewTodo(text);
  }

  function handleAddTodo() {
    if (newTodo.trim() === '') return; // Don't add empty todos
    
    // ✅ FIXED: Create proper todo object with id
    const todoObject = {
      todo: newTodo,
      id: counter
    };
    
    setTodos(todos => [...todos, todoObject]); // ✅ Add the object, not just the text
    setCounter(counter + 1); // ✅ Increment counter
    setNewTodo(''); // Clear input after adding

    Alert.alert(
      'Add Todo',
      'Todo added successfully!',
      [
        {
          text: 'OK',
          style: 'cancel'
        }
      ],
    );
  }

  function handleDeleteTodo(id) {
    setTodos(ts => ts.filter(t => t.id !== id));
  }

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.background}>
        <StatusBar style="auto"/>
        <ImageBackground style={styles.app} source={require('./assets/images/background.jpg')}>
          <View style={styles.inputcontainer}>
            <TextInput 
              onChangeText={handleInputChange}
              value={newTodo} // ✅ ADDED: Controlled input
              style={styles.inputStyle}
              placeholder="Enter a todo"
              placeholderTextColor= "white"
            />
            <Button onPress={handleAddTodo} title="ADD TODO"/>
          </View>

          <ScrollView>
            <View style={styles.todoContainer}>
              {todos.map(todo => (
                <Todo 
                  onDelete={handleDeleteTodo} 
                  key={todo.id} 
                  todo={todo}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.imageContainer}>
            <Image 
              style={styles.image} 
              source={require('./assets/images/carImg.jpg')}
            />
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  inputcontainer: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 10,
  },
  inputStyle: {
    flex: 1,
    borderWidth: 2,
    fontSize: 20,
    paddingHorizontal: 10,
    color: 'white',
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  todoContainer: {
    gap: 15,
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    alignSelf: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  }
});