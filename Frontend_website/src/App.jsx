import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";
import { useGSAP } from "@gsap/react";

const App = () => {
  const form1Ref = useRef();
  const form2Ref = useRef();
  const timeline1 = useRef(gsap.timeline({ paused: true }));
  const timeline2 = useRef(gsap.timeline({ paused: true }));
  const timeline3 = useRef(gsap.timeline({ paused: true }));
  const [name, setName] = useState('');
  const [nitrogen, setNitrogen] = useState(null);
  const [phosphorous, setPhosphorus] = useState(null);
  const [potassium, setPotassium] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [ph, setPh] = useState(null);
  const [rainfall, setRainfall] = useState(null);
  const [data, setData] = useState('');
  useGSAP(()=>{
    timeline2.current.to(".form2", {
      opacity: 1,
      display: "block",
      x: 0,
      ease: "back.inOut",
      onStart: () => console.log("Timeline2 animation started"),
    });
      timeline2.current.fromTo(
        ".form__wrapper div",
        {
          opacity: 0,
          display: "none",
          x: 0,
          y:200,
          ease: "back.inOut",
        },
        {
          opacity: 1,
          display: "block",
          y:0,
          ease: "back.inOut",
          onStart: () => console.log("Timeline2 input animation started"),
        }
      );
    timeline3.current.to(".form2", {
      opacity: 0,
      display: "none",
      ease: "back.inOut",
    })

    timeline3.current.fromTo(".result", {
      opacity: 0,
      x: 0,
    },{
      opacity: 1,
      x: 0,
      ease: "back.inOut",
    })
  },[])

  useEffect(() => {
    gsap.to(".head-text", {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power4",
      stagger: 0.5,
    });

    gsap.fromTo(
      ".text-input",
      { opacity: 0, y: 10 },
      {
        delay: 1,
        opacity: 1,
        y: 0,
        ease: "power3.inOut",
        stagger: 0.5,
      }
    );

    const form1_inputs = gsap.utils.toArray(form1Ref.current.children);

    timeline1.current.to(".form1 h1", {
      opacity: 1,
      display: "none",
      borderBottomWidth: "0px",
      x: -300,
      ease: "back.inOut",
      onStart: () => console.log("Timeline1 animation started"),
    });

    form1_inputs.forEach((input) => {
      timeline1.current.to(input, {
        opacity: 0,
        display: "none",
        borderBottomWidth: "0px",
        x: -300,
        ease: "back.inOut",
        onStart: () => console.log("Timeline1 input animation started"),
      });
    });

    timeline1.current.to("#form1_button", {
      opacity: 0,
      display: "none",
      x: 300,
      duration: 0.5,
      stagger: 0.5,
      ease: "back.inOut",
      onComplete: () => {
        console.log("Timeline1 completed");
        timeline2.current.play();
      },
    });

  }, []);
  
  const fetchData = async () => {
    try {
      let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json"
      };
  
      let bodyContent = JSON.stringify({
        "Nitrogen": nitrogen,
        "Phosporus": phosphorous,
        "Potassium": potassium,
        "Temperature": temperature,
        "Humidity": humidity,
        "Ph": ph,
        "Rainfall": rainfall
      });
  
      console.log("Sending request with body:", bodyContent);
  
      let response = await fetch("http://localhost:5000/predict", { 
        method: "POST",
        body: bodyContent,
        headers: headersList
      });
  
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const i_Data = await response.text();
      console.log("Data fetched:", i_Data);
      setData(i_Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleForm1ButtonClick = () => {
    if (name) {
      console.log("Form 1 button clicked");
      timeline1.current.play();
    } else {
      gsap.to("#form1_button", {
        x: -10,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
      });
    }
  }
  const handleForm2ButtonClick = () => {
    if (nitrogen && phosphorous && potassium && temperature && humidity && ph && rainfall) {
        timeline3.current.play();
        fetchData();
    } else {
      gsap.to("#form2_button", {
        x: -10,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "power1.inOut",
      });
    }
  }
  return (
    <div className="gif w-screen h-screen bg-cover bg-center flex-col flex justify-center items-center overflow-hidden">
      <div className="form1">
        <h1 className="head-text opacity-0 text-2xl font-bold mb-7 text-tagline">
          Get Personalized Crop Recommendations
        </h1>
        <h1 className="head-text opacity-0 text-2xl font-bold mb-7 text-tagline">
          with ML Precision
        </h1>
        <form className="w-full max-w-sm" ref={form1Ref}>
          <div className="flex items-center border-b border-text-input text-input py-2">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              id='name'
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              aria-label="Name"
            />
          </div>
          <div className="flex items-center border-b border-text-input py-2 text-input">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='phone'
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              id='place'
              placeholder="Place"
              aria-label="Place"
            />
          </div>
        </form>
        <div className="flex justify-end mt-3" id="form1_button">
          <button
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleForm1ButtonClick}
          >
            <FaArrowRight className="text-tagline hover:scale-125 transition-all" />
          </button>
        </div>
      </div>

      <div className="form2 hidden">
        <h1 className="head-text opacity-0 text-2xl font-bold mb-7 text-tagline">
          Hello, {name}
        </h1>
        <h1 className="head-text opacity-0 text-2xl font-bold mb-7 text-tagline">
          Please Enter the Following Details
        </h1>
        <form className="w-full max-w-sm form__wrapper" ref={form2Ref}>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='nitrogen'
              min={0}
              required={true}
              value={nitrogen}
              max={200}
              onChange={(e) => setNitrogen(e.target.value)}
              placeholder="Nitrogen (in ppm)"
              aria-label="Nitrogen"
            />
          </div>
          <div className="flex items-center border-b border-text-input py-2 text-input ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='phosphorous'
              required={true}
              max={250}
              min={0}
              value={phosphorous}
              onChange={(e) => setPhosphorus(e.target.value)}
              placeholder="Phosphorous (in ppm)"
              aria-label="Phosphorous"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='potassium'
              required={true}
              value={potassium}
              max={250}
              min={0}
              onChange={(e) => setPotassium(e.target.value)}
              placeholder="Potassium (in ppm)"
              aria-label="Potassium"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='temperature'
              required={true}
              value={temperature}
              max={50}
              min={0}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Temperature (in Celsius)"
              aria-label="Temperature"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='humidity'
              required={true}
              max={100}
              min={0}
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder="Humidity (in %)"
              aria-label="Humidity"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='ph'
              required={true}
              value={ph}
              max={14}
              min={0}
              onChange={(e) => setPh(e.target.value)}
              placeholder="pH Level"
              aria-label="pH Level"
            />
          </div>
          <div className="flex items-center border-b border-text-input text-input py-2 ">
            <input
              className="appearance-none bg-transparent border-none w-full placeholder:placeholder-placeholder-color text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="number"
              id='rainfall'
              required={true}
              value={rainfall}
              min={0}
              max={500}
              onChange={(e) => setRainfall(e.target.value)}
              placeholder="Rainfall (in cm)"
              aria-label="Rainfall"
            />
          </div>
        </form>
        <div className="flex justify-end mt-3" id="form2_button">
          <button
            className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleForm2ButtonClick}
          >
            <FaArrowRight className="text-tagline hover:scale-125 transition-all" />
          </button>
        </div>
      </div>
      {data && <h1 className="result head-text text-2xl font-bold mb-7 text-tagline">{data}</h1>}
    </div>
  );
};

export default App;