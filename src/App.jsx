import "./App.css";
import MyTasks from "./components/MyTasks";

const tagsList = [
  {
    optionId: "HEALTH",
    displayText: "Health",
  },
  {
    optionId: "EDUCATION",
    displayText: "Education",
  },

  {
    optionId: "ENTERTAINMENT",
    displayText: "Entertainment",
  },
  {
    optionId: "SPORTS",
    displayText: "Sports",
  },
  {
    optionId: "TRAVEL",
    displayText: "Travel",
  },
  {
    optionId: "OTHERS",
    displayText: "Others",
  },
];

const App = () => <MyTasks tagsList={tagsList} />;
export default App;
