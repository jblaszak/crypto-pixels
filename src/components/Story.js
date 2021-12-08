import Section from "./Layout/Section";

import classes from "./Story.module.css";

const Story = () => {
  return (
    <Section className={classes.story}>
      <h1 className={classes.title}>The Story</h1>
      <p>
        Crypto Flex Pixels started as a project to learn the fundamentals of
        NFTs and smart contracts. It was a fun concept that was trying to be
        different and take things in a new direction. It was also a "Flex", like
        most expensive artworks. When people asked you about what NFT you
        bought, you'd get the response "You bought what?!? Just a pixel?!?"
      </p>
      <p>
        I didn't really understand what I created at first or why, it was just
        something I thought would be cool. After engaging with the NFT Community
        every day and seeing all the beautiful artworks from others, I asked
        myself 'What is the story this project is telling?"
      </p>
      <p>
        After considering it for a while, I realized that this project is
        actually telling the story of the NFT Community itself with each pixel
        representing a member of the community. While it may seem like we're
        just our own individual projects, we're actually contributing to
        something much bigger than just ourselves and every one is essential.
        The community wouldn't be complete without you!
      </p>
      <p>
        Not everyone is the same though - some projects (pixels) reach beyond
        their own and boost those around them! These are the projects helping
        each other out on socials and doing collabs. You've also got those
        projects that instantly grab your attention - the flashy pixels. And
        unfortunately, the scammers and rugpullers - dead pixels. Try as we
        might, the community will have cliques with certain groups banding
        together more strongly - coin pixels.
      </p>
    </Section>
  );
};

export default Story;
