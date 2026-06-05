
import './App.css'
import {Header} from "./header/Header.tsx";
import Hello from "./hello/Hello.tsx";
import About from "./about/About.tsx";
import Sections from "./sections/Sections.tsx";

function App() {
 return(<div className={"page"}>
     <Header/>
     <Hello/>
     <About/>
     <Sections/>
 </div>)
}

export default App
