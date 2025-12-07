import { PowerGlitch } from "powerglitch";

PowerGlitch.glitch(".page-name", {
  playMode: "hover",
});

PowerGlitch.glitch(".page-socials a", {
  playMode: "hover",
  shake: {
    amplitudeX: -1.2
  }
});
