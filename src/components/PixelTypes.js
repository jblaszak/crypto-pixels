import OverviewCard from "./OverviewCard";
import Section from "./Layout/Section";
import classes from "./PixelTypes.module.css";

const PixelTypes = () => {
  const pixelTypeData = [
    {
      title: "Influential",
      description: "Boosts 3 pixels in each direction!",
    },
    {
      title: "Load Bearing",
      description: "Boosts vertically 5 pixels!",
    },
    {
      title: "Structural",
      description: "Boosts horizontally 5 pixels!",
    },
    {
      title: "Queen",
      description: "Boosts X and + directions 5 pixels!",
    },
    {
      title: "Dead",
      description: "Sucks the color from the pixel!",
    },
    {
      title: "Flashy",
      description: "Flashes brightly for all to see!",
    },
    {
      title: "Hand Crafted",
      description: "Created with great care and love!",
    },
    {
      title: "Musky",
      description: "These pixels will take you to the moon!",
    },
    {
      title: "Coin",
      description: "Rally behind a specific cryptocurrency!",
    },
    {
      title: "Edge",
      description: "Protect the other pixels from the outside world!",
    },
    {
      title: "Diagonal",
      description: "Reach from each edge to keep things together!",
    },
    {
      title: "42",
      description: "The answer to life, pixels, and everything!",
    },
  ];

  return (
    <Section className={classes.pixelTypes}>
      <h1 className={classes.title}>Pixel Types</h1>
      <div className={classes.overview}>
        {pixelTypeData.map((card) => (
          <OverviewCard
            key={card.title}
            title={card.title}
            description={card.description}
            linkText={card.linkText}
            link={card.link}
            internal={card.internal}
          />
        ))}
      </div>
    </Section>
  );
};

export default PixelTypes;
