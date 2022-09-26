import video from "./avengerspinball.mp4"
import "./home.css"
import { default as Logo } from "./output-onlinepngtools.png";

export const HomePage = () => {
    return (
        <>
    <video autoPlay loop="loop" className="video"><source src={video} type="video/mp4" preload="auto" ></source></video>
    <div className="logoContainer">
    <img className="logo" src={Logo}/>
    </div>
    </>)
}