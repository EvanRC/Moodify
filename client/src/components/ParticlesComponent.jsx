// Import the necessary components and hooks from React and tsparticles
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim"; // Importing the slim version of tsparticles for a lighter bundle

// Define the ParticlesComponent component, which accepts props
const ParticlesComponent = (props) => {
  // State to track if particles have been initialized
  const [init, setInit] = useState(false);

  // useEffect hook to initialize particles once on component mount
  useEffect(() => {
    // Initializes the particles engine with a custom configuration
    initParticlesEngine(async (engine) => {
      // Loads the slim version of tsparticles
      // This is beneficial for reducing the size of your JavaScript bundle
      // by only including the features you need
      await loadSlim(engine);
    }).then(() => {
      // Once initialized, set the init state to true
      setInit(true);
    });
    // Empty dependency array means this effect runs only once when the component mounts
  }, []);

  // Callback function to log the container once particles are loaded
  const particlesLoaded = (container) => {
    console.log(container);
  };

  // useMemo hook to memoize the particles configuration
  // This prevents unnecessary recalculations on re-renders
  const options = useMemo(
    () => ({
      // Limit the frame rate to 120 FPS for performance reasons
      fpsLimit: 120,
      interactivity: {
        // Configure events like onClick and onHover
        events: {
          onClick: {
            // Allows particles to repulse on click
            enable: true,
            mode: "repulse",
          },
          onHover: {
            // Enables grabbing effect on hover
            enable: true,
            mode: 'grab',
          },
        },
        // Define modes used for interactivity
        modes: {
          push: {
            // Push effect properties
            distance: 200,
            duration: 15,
          },
          grab: {
            // Distance for the grab effect
            distance: 150,
          },
        },
      },
      // Configuration for the individual particles
      particles: {
        color: {
          // Set the default color of particles
          value: "#ff00ff",
        },
        links: {
          // Configure the links between particles
          color: "#FFFFFF",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          // How particles move
          direction: "none",
          enable: true,
          outModes: {
            // What happens when particles reach the edge
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          // Number and density of particles
          density: {
            enable: true,
          },
          value: 150,
        },
        opacity: {
          // Opacity of the particles
          value: 1.0,
        },
        shape: {
          // Shape of the particles
          type: "circle",
        },
        size: {
          // Size range of the particles
          value: { min: 1, max: 3 },
        },
      },
      // Ensures correct rendering on high-density displays
      detectRetina: true,
    }),
    // The dependency array is empty, so the options object is created only once
    [],
  );

  // Render the Particles component with the provided ID and configuration options
  return <Particles id={props.id} init={particlesLoaded} options={options} />; 
};

export default ParticlesComponent;