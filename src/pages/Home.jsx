import React from 'react'
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
import './commonbackground.css';
const Home = () => {
  return (
    <div className='commonbackground'>
      <Hero title={"Welcome to Medora "}/>
      <Biography imageUrl={"/about.jpg"}/>
      <Departments/>
      <MessageForm/>
    </div>
  )
}

export default Home;
