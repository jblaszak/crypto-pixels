import Section from "./Layout/Section";
import classes from "./Roadmap.module.css";

const Roadmap = () => {
  const roadmapList = [
    {
      isReached: true,
      title: "Launch Project",
      description: `We've been working hard to get the project completed and are excited to release it to the public. The first 
        phase of the launch is underway and giveaways are being minted! We've set aside 99 'Influential Pixels' to hand 
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
      description: "Gifting last 50 influential pixels to discord members",
    },
    {
      isReached: false,
      title: "75% Sold Out",
      description: `Blockchain and the associated technologies have demonstrated the importance of decentralization and limiting 
        points of failure. While these technologies have focused primarily on finance and contract based solutions, 
        there is one group that is focusing on decentralizing the human species and making us multiplanetary. In honor
         of this we've given a portion of our collection the attribute 'Musky Pixels' (402 total) that will not be 
         sold as part of the initial sale but will be given to Elon Musk and the team at SpaceX to give to their team 
         members or to sell to generate funds for SpaceX. We will begin contacting the Doge-father (and we ask the 
          community to participate) once the collection reaches 75% sold out, in order to increase the value given and
          to garner more opportunity for him to notice as the community will be larger and louder at that point.`,
    },
    {
      isReached: false,
      title: "100% Sold Out",
      description: `Great success!  The community is strong and funding to develop future projects has been secured. 
      We've got a number of innovative ideas that we're excited to bring to the NFT space. As a thank-you to our 
      supportive community we will be giving out special perks/giveaways for NFT owners on these future projects.`,
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
