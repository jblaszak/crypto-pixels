import Section from "./Layout/Section";
import classes from "./Roadmap.module.css";

const Roadmap = () => {
  const roadmapList = [
    {
      isReached: true,
      title: "Project Launch",
      description: `We've been working hard to get the project completed and are excited to release it to the public. The first 
        phase of the launch is underway and giveaways have been minted! 300 pixels (200 influential, 100 musky) have been pre-minted 
        as giveaways to generate buzz for the project and reward community members as the project matures.  We've also opened up 
        minting to the public so get in early to get the best price on your NFTs! Early adopters that help grow the community will 
        be rewarded the most as the scaling mint price ensures an increasing value.`,
    },
    {
      isReached: false,
      title: "The Club",
      description: `In order to bring all the projects we have planned under the same umbrella and provide a central place for 
      reaching our community we will be putting together a club.  Membership is open to anyone that is interested in supporting
      our projects.`,
    },
    {
      isReached: false,
      title: "ERC-20 Token",
      description: `An ERC-20 token is planned to provide utility to future projects.  Crypto Flex Pixels holders will be airdropped
      this mysterious token upon its release.  All CFP holders will receive some but more to those CFP's with higher boost value, 
      so scoop up those valuable CFP's! We're also planning on airdropping some tokens to other projects/artists in the community that 
      are interested in collaborations. If all CFP's are not minted by the release of the ERC-20 token, airdrops to holders of newly 
      minted CFP's will be done on a weekly basis until they are all sold.`,
    },
    {
      isReached: false,
      title: "'Project 2' Teaser/Release",
      description: `Teaser released for our second planned project in the NFT space further developing the concept of relational value. 
      This will be a limited release project so raffle winners will be airdropped a portion of the NFTs available.  Our ERC-20 token
      will be able to directly interact with this project and give it utility.`,
    },
    {
      isReached: false,
      title: "'Project 3' Teaser/Release",
      description: `Third project teaser announced! This project will be massive in scale compared to the first two and all holders 
      of either project will get another special airdrop. Certain technical barriers will need to be overcome so this will take considerable 
      development work to figure out the best ways to proceed.`,
    },
    {
      isReached: false,
      title: "Beyond...",
      description: `The crypto space is evolving rapidly and there's no telling where the future will take us, but with each new day 
      of interacting with the community we're getting more and more ideas.  Stay tuned...`,
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
