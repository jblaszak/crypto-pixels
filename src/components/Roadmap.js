import Section from "./Layout/Section";
import classes from "./Roadmap.module.css";

const Roadmap = () => {
  const roadmapList = [
    {
      isReached: true,
      title: "Launch Project",
      description: `We've been working hard to get the project completed and are excited to release it to the public. The first 
        phase of the launch is underway and giveaways are being minted! We've set aside 100 'Influential Pixels' to hand 
        out to influencers in the NFT space to get their attention and reward them for making the market what it is.  We've 
        also opened up minting to the public so get in early to get the best price on your NFTs! Early adopters that help 
        grow the community will be rewarded the most.`,
    },
    {
      isReached: false,
      title: "25% Sold Out",
      description: `While the first 99 influential pixels were used to generate attention/interest for the project, the 
      community has pushed hard to get us to this milestone and it is time to give back! At this milestone we will be having a giveaway 
      for our Discord members and will be gifting a total of 50 influential pixels.`,
    },
    {
      isReached: false,
      title: "50% Sold Out",
      description: `We are half-way there! Pixel lovers have shown their support and have generated considerable momentum for the 
      project. At this milestone will be doing another community giveaway for our Discord members totally another 50 influential
      pixels.`,
    },
    {
      isReached: false,
      title: "75% Sold Out",
      description: `Blockchain and the associated technologies have demonstrated the importance of decentralization and limiting 
        points of failure. While decentralized technologies have focused primarily on finance and contract based solutions, 
        SpaceX is focusing on decentralizing the human species and making us multiplanetary. In honor
         of this we've given a portion of our collection the attribute 'Musky Pixels' (402 total).  At 75% this project has shown
         mooning potential and we're doing another community giveaway, but this time with 100 of the special "Musky Pixels".`,
    },
    {
      isReached: false,
      title: "100% Sold Out",
      description: `Great success!  The community is strong and funding to develop future projects has been secured. 
      We've got a number of innovative ideas that we're excited to bring to the NFT space. Stayed tuned for more announcements 
      as we will also be giving out special perks/giveaways for NFT owners on these future projects.`,
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
