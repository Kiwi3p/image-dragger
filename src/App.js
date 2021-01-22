import "./App.css";
import DragReact from "./components/DragReact";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact component={DragReact} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
