function loaded(img) {
  const MAX_WIDTH = 100;
  const MAX_WIDTH_SQUARED = MAX_WIDTH ** 2;

  let c = document.createElement("canvas");
  let ctx = c.getContext("2d");
  const x = 100;
  const y = 100;
  ctx.drawImage(img, 0, 0, x, y);
  let imgData = ctx.getImageData(0, 0, x, y).data;

  var colorData = Array(x * y);

  for (var i = 0; i < imgData.length; i += 4) {
    colorData[i / 4] = imgData.slice(i, i + 3);
  }

  console.log(colorData);

  let diagPixels = [];
  let edgePixels = [];
  let fortyTwoPixels = [];

  // find edge and fortyTwo pixels
  for (let i = 1; i <= MAX_WIDTH; i++) {
    // diagPixels.push((i - 1) * MAX_WIDTH + 1); // '\' diagonal
    // diagPixels.push((i - 1) * MAX_WIDTH - i + 1); // '/' diagonal
    edgePixels.push(i); // top edge
    edgePixels.push(MAX_WIDTH * (MAX_WIDTH - 1) + i); // bottom edge
    if (i !== 1 && i !== MAX_WIDTH) {
      edgePixels.push(1 + (i - 1) * MAX_WIDTH); // left edge
      edgePixels.push(i * MAX_WIDTH); // right edge
    }
    fortyTwoPixels.push(43 + (i - 1) * 100); // vertical 42 pixels (x = 42)
    const horizontal42 = 42 * MAX_WIDTH + i;
    if (fortyTwoPixels.indexOf(horizontal42) === -1) {
      fortyTwoPixels.push(horizontal42); // horizontal 42 pixels (y = 42)
    }
  }

  for (let i = 0; i < MAX_WIDTH; i++) {
    diagPixels.push(i * MAX_WIDTH + i + 1); // '\' diagonal
    diagPixels.push((i + 1) * MAX_WIDTH - i); // '/' diagonal
  }

  console.log(diagPixels);

  // function to add all pixels of a coin given a starting pixel
  const addCoinPixels = (coinPixelArray, startingPixel) => {
    // array of starting/ending pixels for each row in coin
    const pixels = [
      [startingPixel, startingPixel + 10],
      [startingPixel + MAX_WIDTH - 2, startingPixel + MAX_WIDTH - 2 + 14],
      [
        startingPixel + MAX_WIDTH * 2 - 3,
        startingPixel + MAX_WIDTH * 2 - 3 + 16,
      ],
      [
        startingPixel + MAX_WIDTH * 3 - 4,
        startingPixel + MAX_WIDTH * 3 - 4 + 18,
      ],
      [
        startingPixel + MAX_WIDTH * 4 - 4,
        startingPixel + MAX_WIDTH * 4 - 4 + 18,
      ],
      [
        startingPixel + MAX_WIDTH * 5 - 5,
        startingPixel + MAX_WIDTH * 5 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 6 - 5,
        startingPixel + MAX_WIDTH * 6 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 7 - 5,
        startingPixel + MAX_WIDTH * 7 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 8 - 5,
        startingPixel + MAX_WIDTH * 8 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 9 - 5,
        startingPixel + MAX_WIDTH * 9 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 10 - 5,
        startingPixel + MAX_WIDTH * 10 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 11 - 5,
        startingPixel + MAX_WIDTH * 11 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 12 - 5,
        startingPixel + MAX_WIDTH * 12 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 13 - 5,
        startingPixel + MAX_WIDTH * 13 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 14 - 5,
        startingPixel + MAX_WIDTH * 14 - 5 + 20,
      ],
      [
        startingPixel + MAX_WIDTH * 15 - 4,
        startingPixel + MAX_WIDTH * 15 - 4 + 18,
      ],
      [
        startingPixel + MAX_WIDTH * 16 - 4,
        startingPixel + MAX_WIDTH * 16 - 4 + 18,
      ],
      [
        startingPixel + MAX_WIDTH * 17 - 3,
        startingPixel + MAX_WIDTH * 17 - 3 + 16,
      ],
      [
        startingPixel + MAX_WIDTH * 18 - 2,
        startingPixel + MAX_WIDTH * 18 - 2 + 14,
      ],
      [startingPixel + MAX_WIDTH * 19, startingPixel + MAX_WIDTH * 19 + 10],
    ];

    for (let i = 0; i < pixels.length; i++) {
      for (let j = pixels[i][0]; j < pixels[i][1]; j++) {
        coinPixelArray.push(j);
      }
    }
  };

  // array of starting/ending pixels for each row in coin/object (some don't follow exactly the formula above)
  const DOGEStartEnd = [
    [7018, 7025],
    [7117, 7126],
    [7215, 7228],
    [7314, 7329],
    [7414, 7429],
    [7513, 7530],
    [7612, 7631],
    [7712, 7731],
    [7812, 7831],
    [7912, 7931],
    [8012, 8031],
    [8112, 8131],
    [8212, 8231],
    [8312, 8331],
    [8413, 8430],
    [8514, 8529],
    [8614, 8629],
    [8715, 8728],
    [8817, 8826],
    [8918, 8925],
  ];

  const SOLStartEnd = [
    [7541, 7548],
    [7640, 7649],
    [7738, 7751],
    [7837, 7852],
    [7936, 7953],
    [8036, 8053],
    [8135, 8154],
    [8235, 8254],
    [8335, 8354],
    [8435, 8454],
    [8535, 8554],
    [8635, 8654],
    [8735, 8754],
    [8835, 8854],
    [8936, 8953],
    [9036, 9053],
    [9137, 9152],
    [9238, 9251],
    [9340, 9349],
    [9441, 9448],
  ];

  const rocketStartEnd = [
    [6828, 6834],
    [6927, 6934],
    [7025, 7034],
    [7127, 7134],
    [7229, 7234],
    [7330, 7333],
    [7430, 7433],
    [7804, 7812],
    [7904, 7911],
    [8003, 8011],
    [8103, 8112],
    [8202, 8212],
    [8302, 8312],
    [8401, 8412],
    [8501, 8513],
    [8601, 8613],
    [8701, 8714],
    [8803, 8816],
    [8902, 8919],
    [9001, 9022],
    [9101, 9122],
    [9201, 9222],
    [9301, 9322],
    [9401, 9422],
    [9501, 9522],
    [9601, 9622],
    [9701, 9720],
    [9801, 9818],
    [9901, 9916],
  ];

  const extraRocketBits = [7531, 7532, 7612, 7712, 7732];

  const addBetweenPixels = (coinPixelArray, pixels) => {
    for (let i = 0; i < pixels.length; i++) {
      for (let j = pixels[i][0]; j <= pixels[i][1]; j++) {
        coinPixelArray.push(j);
      }
    }
  };

  let LUNAPixels = [];
  let AVAXPixels = [];
  let LINKPixels = [];
  let UNIPixels = [];
  let ETHPixels = [];
  let ADAPixels = [];
  let LTCPixels = [];
  let DOTPixels = [];
  let BTCPixels = [];
  let BNBPixels = [];
  let DOGEPixels = [];
  let SOLPixels = [];
  let XRPPixels = [];
  let ALGOPixels = [];
  let ATOMPixels = [];
  let muskyPixels = [];

  addCoinPixels(LUNAPixels, 414);
  addCoinPixels(AVAXPixels, 42);
  addCoinPixels(LINKPixels, 173);
  addCoinPixels(UNIPixels, 2707);
  addCoinPixels(ETHPixels, 2230);
  addCoinPixels(ADAPixels, 1757);
  addCoinPixels(LTCPixels, 2185);
  addCoinPixels(DOTPixels, 4620);
  addCoinPixels(BTCPixels, 4344);
  addCoinPixels(BNBPixels, 3869);
  addCoinPixels(XRPPixels, 6158);
  addCoinPixels(ALGOPixels, 5684);
  addCoinPixels(ATOMPixels, 7776);
  addBetweenPixels(DOGEPixels, DOGEStartEnd);
  addBetweenPixels(SOLPixels, SOLStartEnd);
  addBetweenPixels(muskyPixels, rocketStartEnd);
  extraRocketBits.forEach((pixel) => muskyPixels.push(pixel));

  const deadPixels = [
    6006, 2121, 2746, 4367, 1092, 9668, 9406, 2047, 8093, 705, 5305, 2474, 6674,
    6650, 8832, 1833, 1772, 4490, 6592, 4935, 9245, 136, 4489, 2721, 1996, 7796,
    4222, 9425, 2603, 3063,
  ];
  const flashyPixels = [
    6834, 5249, 2435, 3107, 8576, 347, 6294, 1097, 6025, 1719, 3935, 478, 7163,
    6576, 1463, 4227, 3575, 4056, 6822, 5192,
  ];
  const handCraftedPixels = [
    1516, 1247, 1176, 3315, 3435, 2759, 2986, 5424, 5049, 4772, 8017, 8543,
    7062, 6688, 8780,
  ];
  const influentialPixels = [
    9736, 3682, 6393, 2077, 6884, 6935, 6228, 3983, 2313, 5757, 6322, 5439,
    7528, 1197, 2368, 7956, 6566, 9243, 7786, 868, 8383, 5365, 1510, 6427, 6671,
    2848, 385, 4095, 6388, 7661, 8230, 180, 1423, 8395, 4929, 5104, 9466, 9465,
    3825, 483, 6255, 8058, 8801, 1593, 298, 7218, 1481, 6729, 4161, 3127, 710,
    5961, 309, 2784, 1917, 3615, 1794, 2811, 4533, 7762, 4184, 4002, 3956, 8116,
    1407, 6527, 5882, 8079, 3599, 6202, 4230, 5392, 865, 3535, 6016, 1630, 7345,
    2748, 6284, 2691, 4401, 5323, 6626, 2357, 2304, 4983, 3930, 5669, 3350, 82,
    4871, 4522, 5656, 1150, 6159, 2760, 186, 5662, 1966, 7138, 1617, 510, 8486,
    6281, 2183, 9280, 1668, 3910, 282, 3920, 1701, 3717, 2240, 8355, 161, 6752,
    3168, 9473, 6192, 5526, 914, 5654, 2999, 4329, 2588, 8152, 5466, 4098, 2742,
    9442, 437, 3421, 9942, 9737, 4827, 9180, 5001, 5808, 9395, 2449, 2892, 2977,
    9259, 8589, 9326, 5534, 443, 3470, 191, 5247, 6921, 4785, 2022, 4156, 2655,
    4133, 3420, 5204, 1983, 4327, 1453, 1559, 4973, 5187, 2652, 7953, 1514,
    1882, 8693, 2089, 2288, 5371, 2251, 4022, 1016, 5301, 4317, 319, 5007, 3807,
    3022, 6450, 6156, 2138, 1154, 537, 8021, 7933, 933, 1834, 2522, 8540, 4597,
    5310, 7318, 9774, 6040, 1135, 6331,
  ];

  let pixelAttributes = "";

  const coinArrays = [
    LUNAPixels,
    AVAXPixels,
    LINKPixels,
    UNIPixels,
    ETHPixels,
    ADAPixels,
    LTCPixels,
    DOTPixels,
    BTCPixels,
    BNBPixels,
    DOGEPixels,
    SOLPixels,
    XRPPixels,
    ALGOPixels,
    ATOMPixels,
  ];

  const pad = (padding, value) => {
    return ("0".repeat(padding) + value).slice(-padding);
  };

  for (let i = 1; i <= MAX_WIDTH_SQUARED; i++) {
    // Calculate distance to center
    const x = (i - 1) % MAX_WIDTH;
    const y = Math.floor((i - 1) / MAX_WIDTH);
    let mid = MAX_WIDTH / 2 - 0.5;
    let d2c = 0;

    if (MAX_WIDTH % 2) {
      mid = Math.floor(mid);
      const xDist = Math.abs(x - mid);
      const yDist = Math.abs(y - mid);
      d2c = Math.max(xDist, yDist);
    } else {
      const xDist = Math.abs(x - mid);
      const yDist = Math.abs(y - mid);
      d2c = Math.floor(Math.max(xDist, yDist));
    }

    pixelAttributes += pad(3, colorData[i - 1][0].toString());
    pixelAttributes += pad(3, colorData[i - 1][1].toString());
    pixelAttributes += pad(3, colorData[i - 1][2].toString());
    // Add distance to center
    pixelAttributes += pad(2, d2c.toString());
    // Add other attributes
    pixelAttributes += diagPixels.includes(i) ? "1" : "0";
    pixelAttributes += edgePixels.includes(i) ? "1" : "0";
    pixelAttributes +=
      fortyTwoPixels.includes(i) || i.toString().includes("42") ? "1" : "0";
    pixelAttributes += muskyPixels.includes(i) ? "1" : "0";
    pixelAttributes += deadPixels.includes(i) ? "1" : "0";
    pixelAttributes += flashyPixels.includes(i) ? "1" : "0";
    pixelAttributes += handCraftedPixels.includes(i) ? "1" : "0";
    pixelAttributes += influentialPixels.includes(i) ? "1" : "0";
    // Add coin values
    let foundCoin = false;
    for (let j = 0; j < coinArrays.length; j++) {
      if (coinArrays[j].includes(i)) {
        pixelAttributes += pad(2, (j + 1).toString());
        foundCoin = true;
        break;
      }
    }
    if (!foundCoin) pixelAttributes += "00";
  }

  msg.innerText = pixelAttributes;
}
