
import "./App.css";
import RootNavigator from "./navigation/RootNavigator";
import {useSockets} from "./contexts/socketContext";


const App = () => {
  // Setting the document title, so we see in which tap I am testing out
  document.title= 'Student';

  const socketContext = useSockets();
  console.log("Setting up socket listener for hello");
  socketContext.socket.on("hello", (m) => { console.log("Received from server: " + m); });

  return <RootNavigator />;
};

export default App;
