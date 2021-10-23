import OverviewCard from "./OverviewCard";
import Section from "./Layout/Section";

import classes from "./Overview.module.css";

const Overview = () => {
  const overviewCardData = [
    {
      title: "Polarizing",
      description:
        "Some of the best art is loved by people precisely because others hate it. (link to banksy)",
    },
    {
      title: "Simple is Best",
      description:
        "Examples of very simple pieces of art that have sold for millions - (https://bit.ly/3FLmeil)",
    },
    {
      title: "Bigger Picture",
      description:
        "Your nft doesn't exist on its own but as an integral part of a collection.",
    },
    {
      title: "Community Perks",
      description:
        "Giveaways and bonuses on future projects! The gift that keeps on giving.",
    },
    {
      title: "Low Gas Fees",
      description:
        "NFT exists on the Polygon network to reduce the gas fees that collectors pay.",
    },
    {
      title: "Less Stagnation",
      description:
        "Cheer on your favorite crypto as market prices for coins rise/fall and change collection value.",
    },
  ];

  return (
    <Section className={classes.overview}>
      {overviewCardData.map((card) => (
        <OverviewCard
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </Section>
  );
};

export default Overview;
