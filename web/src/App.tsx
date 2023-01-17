import { Habit } from "./components/Habit"

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={1} />
      <Habit completed={2} />
      <Habit completed={43} />
      <Habit completed={35} />
      <Habit completed={31} />
      <Habit completed={311} />
    </div>
  )
}

export default App
