import { Typography } from "@mui/material";

export const transformStringToTypographyForPixel = (inputString: string) => {
  // Check if the input contains the screen size by looking for the double-quote character
  const quoteIndex = inputString?.indexOf('"');
  
  if (quoteIndex !== -1) {
    // If there's a quote, split the string at the quote and the pixel dimensions
    const screenSize = inputString.substring(0, quoteIndex + 1); // Screen size including the quote
    let resolution = inputString.substring(quoteIndex + 1); // Resolution after the quote
    
    // Ensure 'pixels' has a space before it
    resolution = resolution.replace("pixels", " pixels");

    return (
      <>
        <Typography variant="body1" className="font-bold">
          {screenSize}
        </Typography>
        <Typography sx={{ fontSize: 12 }} variant="body2">
          {resolution}
        </Typography>
      </>
    );
  } else if (inputString.includes("x")) {
    // If no quote, but resolution is present
    const resolutionWithSpace = inputString.replace("pixels", " pixels");
    
    return (
      <>
        <Typography   className=" mt-3 text-sm">
          {resolutionWithSpace}
        </Typography>
      </>
    );
  } else {
    // If the input does not match any of the expected formats
    return (
      <Typography variant="body1">
        {inputString}
      </Typography>
    );
  }
};

export const transformCameraStringToTypographyCamera = (inputString: string) => {
  // Find the index of "MP"
  const mpIndex = inputString.indexOf("MP");

  if (mpIndex !== -1) {
    // Split the string into camera resolution and video resolution
    const cameraResolution = inputString.substring(0, mpIndex + 2); // Includes "MP"
    const videoResolution = inputString.substring(mpIndex + 2); // Everything after "MP"

    return (
      <>
        <Typography variant="body1" className="font-bold">
          {cameraResolution}
        </Typography>
        <Typography sx={{ fontSize: 12 }} variant="body2">
          {videoResolution}
        </Typography>
      </>
    );
  } else {
    // If "MP" is not found, just return the whole input string
    return (
      <Typography variant="body1">
        {inputString}
      </Typography>
    );
  }
};

export const transformRamStringToTypographyChipSet = (inputString: string) => {
  // Find the index of "RAM"
  const ramIndex = inputString.indexOf("RAM");

  if (ramIndex !== -1) {
    // Split the string into memory size and the rest
    const memorySize = inputString.substring(0, ramIndex + 3); // Includes "RAM"
    const rest = inputString.substring(ramIndex + 3).trim(); // Everything after "RAM", trimming any leading space

    return (
      <>
        <Typography variant="body1" className="font-bold">
          {memorySize}
        </Typography>
        {rest && (
          <Typography sx={{ fontSize: 12 }} variant="body2">
            {rest}
          </Typography>
        )}
      </>
    );
  } else {
    // If "RAM" is not found, just return the whole input string
    return (
      <Typography variant="body1">
        {inputString}
      </Typography>
    );
  }
};
