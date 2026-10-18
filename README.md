<<<<<<< HEAD
# ANIME//VERSE — Java + Spring Boot

A responsive anime discovery landing page using your Levi Ackerman MP4 as the full-screen hero background.

## Requirements
- Java 17 or newer
- Maven 3.8+

## Run it
1. Extract this folder.
2. Open a terminal in the project folder (the one containing `pom.xml`).
3. Run:

   ```bash
   mvn spring-boot:run
   ```

4. Open http://localhost:8080

## Included interactions
- Autoplaying, muted, looping MP4 background with play/pause control
- Responsive navigation menu
- Anime cards with detail dialogs
- Genre filters and live search
- Add/remove titles from a watchlist (saved in browser local storage)
- Responsive mobile layout

## Project structure
- `src/main/java/com/animehub/AnimeHubApplication.java` — Java Spring Boot entry point
- `src/main/resources/static/index.html` — webpage
- `src/main/resources/static/styles.css` — styling
- `src/main/resources/static/app.js` — interactions
- `src/main/resources/static/video/levi-background.mp4` — supplied background video

Note: Java runs the web server; JavaScript runs browser interactions. Browsers do not execute ordinary Java directly inside HTML pages.
=======
hh
>>>>>>> 249f242c019037a24738afbcadd77d336d0959ce
