import { Sidebar } from './features/sidebar/Sidebar';
import { Header } from './components/header/Header';
import { Canvas } from './features/canvas/Canvas';
import { Inspector } from './features/inspector/Inspector';
import { Copilot } from './features/copilot/Copilot';
import QuickPrompt from './components/QuickPrompt/QuickPrompt';
import './style/App.scss'
import { Footer } from './components/Footer/Footer';
function App() {
  return (
    <div className="App">
      <Header/>         {/* 🕵🏼‍♀️ ✅ */}
      <Sidebar/>        {/* 🕵🏼‍♀️ ✅ */}
      <Canvas/>         {/* 🕵🏼‍♀️ 🤙 */}
      <Inspector/>
      <Copilot/>
      <QuickPrompt/>
      <Footer/>
    </div>
  );
}

export default App;
