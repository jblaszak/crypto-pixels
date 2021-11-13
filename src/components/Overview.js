import OverviewCard from "./OverviewCard";
import Section from "./Layout/Section";

import classes from "./Overview.module.css";

const Overview = () => {
  const overviewCardData = [
    {
      title: "Polarizing",
      description: "Some of the best art is loved by people precisely ",
      linkText: "because others hate it.",
      link: "https://wapo.st/3CF24o9",
    },
    {
      title: "Simple is Best",
      description: "Examples of very simple pieces of art that have ",
      linkText: "sold for millions.",
      link: "https://bit.ly/3FLmeil",
    },
    {
      title: "Bigger Picture",
      description:
        "Your nft doesn't exist on its own but as an integral part of ",
      linkText: "a collection.",
      link: "/collection-viewer",
      internal: true,
    },
    {
      title: "Community Perks",
      description:
        "Giveaways and bonuses on future projects! The gift that keeps on giving.",
    },
    {
      title: "Low Gas Fees",
      description:
        "NFT created on the Polygon network to greatly reduce the gas fees that collectors pay.",
    },
    {
      title: "Early Adopter Bonus",
      description:
        "A scaling mint fee means earlier adopters have built-in scaling to their investment.",
    },
  ];

  return (
    <Section className={classes.overview}>
      {overviewCardData.map((card) => (
        <OverviewCard
          key={card.title}
          title={card.title}
          description={card.description}
          linkText={card.linkText}
          link={card.link}
          internal={card.internal}
        />
      ))}
    </Section>
  );
};

export default Overview;
