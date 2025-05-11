import Header from './components/Header';
import Footer from './components/Footer';
import UserForm from './components/UserForm';
import TaskCard from './components/TaskCard';


function App() {
  const sampleTask = {
    title: "Finish Capstone",
    description: "Work on frontend components",
    completed: false,
  };

  return (
    <>
      <Header />
      <UserForm />
      <TaskCard task={sampleTask} />
      <Footer />
    </>
  );
}

export default App;