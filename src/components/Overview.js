import OverviewCard from "./OverviewCard";

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
        "Giveaways and bonuses on future projects! The gift that keeps on giving. ",
    },
    {
      title: "Charitable",
      description:
        "Portion of collection will be donated to generate funds for SpaceX.",
    },
    {
      title: "Less Stagnation",
      description:
        "Cheer on your favorite crypto as market prices for coins rise/fall and change collection value.",
    },
  ];

  return (
    <section className={classes.section}>
      {overviewCardData.map((card) => (
        <OverviewCard
          key={card.title}
          title={card.title}
          description={card.description}
        />
      ))}
    </section>
  );
};

export default Overview;
