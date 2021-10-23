import Section from "./Layout/Section";
import classes from "./Roadmap.module.css";

const Roadmap = () => {
  const roadmapList = [
    {
      isReached: true,
      title: "Launch Project",
      description:
        "We've been working hard to get the project completed and are excited to release it to the public. The first phase of the launch ",
    },
    {
      isReached: false,
      title: "25% Sold Out",
      description: "Gifting 50 influential pixels to discord members",
    },
    {
      isReached: false,
      title: "50% Sold Out",
      description: "Gifting last 50 influential pixels to discord members",
    },
    {
      isReached: false,
      title: "75% Sold Out",
      description:
        "Donating Musky pixels (500 total) to Elon/SpaceX to sell to generate funds for becoming a multiplanetary species",
    },
    {
      isReached: false,
      title: "100% Sold Out",
      description: "Special perks/freebies for NFT owners on future projects",
    },
  ];

  return (
    <Section className={classes.roadmap}>
      <div className={classes.header}>
        <h1>Roadmap</h1>
        <p>
          This roadmap outlines our goals for this project. Check back here to
          see the current state of the project and announcements of future
          projects!
        </p>
      </div>
      <ul className={classes.timeline}>
        {roadmapList.map((item) => (
          <li
            className={item.isReached ? classes.isReached : null}
            key={item.title}
          >
            <div className={classes.title}>{item.title}</div>
            <div className={classes.description}>{item.description}</div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Roadmap;
