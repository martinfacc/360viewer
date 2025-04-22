# 360Viewer

360-degree panoramic image viewer with additional features to enhance visualization.

## Description

360Viewer is a web application that allows you to load and view 360-degree panoramic images. The application uses React, Three.js, and React Three Fiber to create an immersive spherical viewing experience where the user can navigate through the panoramic image in all directions.

## Features

- **360° Visualization**: Load and view panoramic images in an immersive 3D environment.
- **Interactive Navigation**: Orbital control to explore the image from any angle.
- **Mirror Effect**: Option to horizontally flip the image when necessary.
- **Adaptive Bands**: Adds bands at the top and bottom of the image that adapt their color to the content, improving the visual experience.
- **Size Adjustment**: Slider control to adjust the size of the adaptive bands.

## Technologies Used

- React 19
- Three.js
- React Three Fiber
- Material UI
- TypeScript
- Vite
- Express (for deployment)

## Prerequisites

- Node.js (recommended version 20 or higher)
- npm or yarn

## Installation and Usage

### Development Mode

1. Clone this repository:

   ```
   git clone https://github.com/your-username/360viewer.git
   cd 360viewer
   ```

2. Install dependencies:

   ```
   npm install
   # or with yarn
   yarn
   ```

3. Start the development server:

   ```
   npm run dev
   # or with yarn
   yarn dev
   ```

4. Open your browser at `http://localhost:5173` (or the port indicated in the console).

### Production Build

1. Generate the production build:

   ```
   npm run build
   # or with yarn
   yarn build
   ```

2. The compiled code will be generated in the `dist/` folder.

### Deployment

1. Configure the `.env` file with the desired port (create the file based on `.env.example`):

   ```
   APP_PORT=3000
   ```

2. Start the server:

   ```
   node server.js
   ```

3. The application will be available at `http://localhost:3000` (or the configured port).

## How to Use the Application

1. Open the application in your browser.
2. Click on the tools button located in the bottom right corner.
3. Select "Select image" to load a 360 panoramic image.
4. Use the mouse to navigate through the image:
   - Click and drag to rotate the view
   - Mouse wheel to zoom
5. In the tools menu you can:
   - Enable/disable the mirror effect
   - Enable/disable the adaptive bands
   - Adjust the size of the bands (when enabled)

## Limitations

- Currently only supports equirectangular images (360° panoramic format)
- No persistence of settings between sessions

## Contributions

Contributions are welcome. Please open an issue or a pull request for suggestions or improvements.

## License

[MIT](./LICENSE)
