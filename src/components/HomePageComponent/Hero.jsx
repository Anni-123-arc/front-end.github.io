import HeroImg from './../../images/Voters at the Polling Station.png'
import './../../css/Hero.css'
export default function Hero(){
    return (
        <div className="Hero-Page">
           <img src={HeroImg} alt="Hero-Image" />
        </div>
    );
}