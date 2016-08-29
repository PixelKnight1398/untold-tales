# untold-tales
Text-adventure creation engine
  Untold-Tales is meant for the creation of text-adventure games without any programming experience on the authors part.  Using pure javascript, an author can write their text adventure games, then export them in a json file which is dynamically written upon request to save their progress.
  Once this json file is created, it can be uploaded to a server via php and unpacked into a fully functional game on a webpage by decoding the json file and creating the game objects based on what it contains.
  The javascript should be written to detect malicious code that could be inputed to the json file, and protect any php server.  The goal was to create something that could run in any browser easily, even on mobile, without any downloads.
  Idea was created for ToyMakersDev.com, to allow users to upload their games and expand the developer horizons.
