export const MAX_WIDTH = 100;
export const COLLECTION_SIZE = MAX_WIDTH ** 2;
export const PIXEL_WIDTH = 7;
export const PIXEL_GAP = 1;
export const DISTANCE_THRESHOLD_IN_PIXELS = 8 * (PIXEL_WIDTH + PIXEL_GAP);
export const DISTANCE_THRESHOLD = DISTANCE_THRESHOLD_IN_PIXELS ** 2;
export const INITIAL_CANVAS_WIDTH = 800;
export const NAME = "Crypto Flex Pixels";
export const NAME_SHORT = "CFP";
export const DISCORD = "https://discord.gg/Epy2xtzZrx";
export const TWITTER = "https://twitter.com/Flex_Pixels_NFT";
export const OPENSEA = "";
export const CONTRACT_ADDRESS = "0xdF4d0823c80F69F3Ec5DA09B5eF6032A7471744b";
export const TOTAL_TOKENS_ARRAY = [...new Array(COLLECTION_SIZE)].map(
  (x, i) => i + 1
);
