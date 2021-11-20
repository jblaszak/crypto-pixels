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
  // const influentialPixels = [
  //   9736, 3682, 6393, 2077, 6884, 6935, 6228, 3983, 2313, 5757, 6322, 5439,
  //   7528, 1197, 2368, 7956, 6566, 9243, 7786, 868, 8383, 5365, 1510, 6427, 6671,
  //   2848, 385, 4095, 6388, 7661, 8230, 180, 1423, 8395, 4929, 5104, 9466, 9465,
  //   3825, 483, 6255, 8058, 8801, 1593, 298, 7218, 1481, 6729, 4161, 3127, 710,
  //   5961, 309, 2784, 1917, 3615, 1794, 2811, 4533, 7762, 4184, 4002, 3956, 8116,
  //   1407, 6527, 5882, 8079, 3599, 6202, 4230, 5392, 865, 3535, 6016, 1630, 7345,
  //   2748, 6284, 2691, 4401, 5323, 6626, 2357, 2304, 4983, 3930, 5669, 3350, 82,
  //   4871, 4522, 5656, 1150, 6159, 2760, 186, 5662, 1966, 7138, 1617, 510, 8486,
  //   6281, 2183, 9280, 1668, 3910, 282, 3920, 1701, 3717, 2240, 8355, 161, 6752,
  //   3168, 9473, 6192, 5526, 914, 5654, 2999, 4329, 2588, 8152, 5466, 4098, 2742,
  //   9442, 437, 3421, 9942, 9737, 4827, 9180, 5001, 5808, 9395, 2449, 2892, 2977,
  //   9259, 8589, 9326, 5534, 443, 3470, 191, 5247, 6921, 4785, 2022, 4156, 2655,
  //   4133, 3420, 5204, 1983, 4327, 1453, 1559, 4973, 5187, 2652, 7953, 1514,
  //   1882, 8693, 2089, 2288, 5371, 2251, 4022, 1016, 5301, 4317, 319, 5007, 3807,
  //   3022, 6450, 6156, 2138, 1154, 537, 8021, 7933, 933, 1834, 2522, 8540, 4597,
  //   5310, 7318, 9774, 6040, 1135, 6331,
  // ];

  // let influentialPixels = [];

  // for (let i = 0; i < 200; i++) {
  //   while (true) {
  //     const pixel = Math.floor(Math.random() * 10000);
  //     if (!influentialPixels.includes(pixel) && !muskyPixels.includes(pixel)) {
  //       influentialPixels.push(pixel);
  //       break;
  //     }
  //   }
  // }

  // let muskyGiveAways = [];
  // for (let i = 0; i < 100; i++) {
  //   while (true) {
  //     const index = Math.floor(Math.random() * muskyPixels.length);
  //     const pixel = muskyPixels[index];
  //     if (!muskyGiveAways.includes(pixel)) {
  //       muskyGiveAways.push(pixel);
  //       break;
  //     }
  //   }
  // }

  // let combinedGiveAways = muskyGiveAways.concat(influentialPixels);
  // combinedGiveAways = combinedGiveAways.sort((a, b) => b - a);

  // console.log("influential pixels: ", influentialPixels);
  // console.log("musky giveaways: ", muskyGiveAways);
  // console.log("combined giveaways: ", combinedGiveAways);

  const influentialPixels = [
    4154, 1769, 9595, 3179, 461, 6011, 3169, 6895, 7601, 2566, 2945, 6205, 3907,
    2769, 1401, 5537, 5225, 6376, 8127, 1205, 9295, 3565, 9586, 4844, 173, 711,
    7722, 7209, 3176, 3707, 2225, 1016, 7858, 5520, 6966, 2911, 596, 2820, 8244,
    108, 9473, 4837, 6435, 549, 2860, 6167, 4599, 8494, 976, 2152, 5128, 792,
    8281, 9348, 9587, 7488, 5346, 2597, 3256, 6309, 6622, 4157, 1008, 1104,
    3277, 5913, 1589, 5630, 6721, 910, 5437, 9531, 818, 137, 2162, 5893, 6193,
    7900, 9239, 5866, 2062, 9897, 9722, 4580, 6176, 3506, 8352, 7067, 4841,
    8572, 1143, 7327, 7929, 5049, 7409, 6451, 3423, 4521, 4839, 6398, 2665,
    6553, 6171, 139, 2461, 6886, 6630, 9599, 2986, 2480, 7123, 8589, 6351, 9583,
    8874, 3013, 2126, 3648, 6027, 9380, 1888, 1339, 5522, 7362, 6961, 6339,
    6525, 3691, 1786, 9200, 9453, 4659, 6430, 655, 4161, 7418, 3038, 1637, 6882,
    1250, 4588, 6442, 7325, 8593, 3667, 743, 7598, 4225, 4259, 2982, 2033, 3967,
    3814, 6786, 566, 7265, 1272, 3880, 9731, 1167, 4765, 5839, 6819, 8260, 23,
    5933, 3551, 6165, 821, 2523, 6629, 2822, 3811, 1096, 3534, 6042, 6064, 6936,
    5242, 312, 4867, 7936, 5473, 3464, 6268, 835, 8547, 1653, 521, 9487, 2498,
    2869, 1356, 8817, 9133, 3569, 5583, 4750, 5854, 6346,
  ];

  // let loadPixels = [];
  // let structuralPixels = [];
  // let queenPixels = [];

  // const genPixels = (arr, amount) => {
  //   for (let i = 0; i < amount; i++) {
  //     while (true) {
  //       const pixel = Math.floor(Math.random() * 10000);
  //       if (!arr.includes(pixel)) {
  //         arr.push(pixel);
  //         break;
  //       }
  //     }
  //   }
  // };

  // genPixels(loadPixels, 200);
  // genPixels(structuralPixels, 200);
  // genPixels(queenPixels, 69);

  // console.log("load pixels: ", loadPixels);
  // console.log("structural: ", structuralPixels);
  // console.log("queen: ", queenPixels);

  let loadPixels = [
    6583, 7545, 6157, 8222, 4118, 118, 4297, 7300, 8585, 4293, 3682, 2849, 5706,
    5626, 8225, 7784, 3854, 5727, 3493, 82, 8560, 7600, 7950, 595, 69, 5228,
    246, 3844, 4024, 8759, 1423, 7997, 7138, 7897, 469, 9991, 5261, 1662, 4746,
    739, 3222, 6882, 1579, 7453, 1165, 3058, 6620, 2671, 9849, 2601, 914, 8075,
    6097, 6376, 9652, 7276, 4019, 5275, 3447, 1050, 4736, 6316, 2279, 6897,
    4210, 9871, 1345, 9602, 591, 6139, 9666, 1380, 9899, 7366, 1642, 1363, 4211,
    1056, 9711, 6451, 5880, 4541, 7524, 2023, 4850, 2098, 7296, 2194, 4963,
    1015, 8420, 7123, 9553, 1334, 7035, 625, 5200, 4606, 3808, 4988, 6497, 51,
    8613, 8433, 7577, 3446, 6806, 4360, 2366, 4462, 3450, 9723, 2706, 7672,
    3931, 2969, 8108, 5326, 6894, 9320, 6492, 4912, 1578, 4665, 6550, 9196,
    8824, 453, 6605, 8566, 1243, 8819, 3129, 4012, 7708, 800, 8192, 2885, 4500,
    7838, 7458, 8017, 720, 7212, 7492, 3215, 7704, 9863, 8027, 1686, 1706, 8339,
    5825, 1562, 3873, 9604, 940, 5831, 4116, 3823, 7275, 4507, 7167, 2100, 1671,
    8320, 1904, 5772, 4920, 7845, 8649, 1420, 2459, 4399, 3431, 9439, 7392,
    5015, 4060, 7522, 7400, 4470, 2905, 984, 2044, 1172, 541, 9362, 2204, 4384,
    5322, 2058, 4187, 3514, 6464, 1171, 125, 6738, 2694, 4182,
  ];
  let structuralPixels = [
    6632, 3502, 8282, 7443, 6475, 9907, 8077, 6340, 9236, 6790, 6818, 8831,
    1930, 8637, 4639, 6402, 3282, 2095, 8153, 3370, 2230, 8660, 1702, 9589,
    9973, 5706, 5193, 7036, 2674, 5489, 8230, 429, 7213, 570, 8029, 9148, 6443,
    8645, 861, 5871, 1391, 1460, 2244, 2564, 4746, 1852, 5852, 4322, 4803, 9338,
    7710, 3575, 2704, 5368, 4249, 138, 2786, 6366, 3675, 1434, 9555, 8009, 1464,
    8988, 386, 8490, 5024, 6805, 143, 1189, 6608, 7494, 7084, 6808, 2581, 1800,
    4708, 1299, 8057, 9573, 9699, 90, 6578, 5122, 9963, 9331, 3822, 2044, 7243,
    6676, 641, 910, 6033, 1588, 6874, 8600, 8150, 1834, 7003, 6185, 1635, 1210,
    5600, 9490, 7216, 617, 8634, 2341, 1228, 1522, 3595, 4432, 5144, 8987, 4471,
    8711, 1297, 2188, 3664, 2948, 5786, 9707, 3367, 4040, 2416, 8630, 8446,
    3646, 7002, 8035, 1381, 1770, 730, 7847, 8286, 8461, 2449, 9296, 1720, 482,
    9295, 7271, 94, 2655, 2009, 3749, 6569, 4925, 5136, 4020, 3137, 2291, 6905,
    7763, 1503, 211, 5720, 7519, 9832, 2779, 5238, 7481, 7367, 7681, 4741, 7231,
    5369, 3129, 6159, 3899, 5574, 5887, 9382, 184, 7841, 7516, 132, 5993, 2908,
    9255, 5254, 2562, 3551, 4449, 4738, 8103, 7115, 7023, 4920, 9627, 6192,
    4393, 6114, 3008, 3505, 5688, 274, 8425, 7238, 5672,
  ];
  let queenPixels = [
    8115, 2018, 8778, 1069, 8938, 757, 8651, 2512, 7065, 8318, 4061, 1067, 8471,
    3653, 59, 441, 7322, 2940, 4392, 5447, 342, 1246, 734, 6893, 829, 8820,
    8583, 8927, 5155, 4266, 2799, 1912, 2563, 3704, 4982, 7005, 909, 3313, 8569,
    6148, 7007, 8888, 3174, 6694, 9937, 7839, 6106, 3035, 8682, 4442, 3075,
    3629, 317, 4309, 6990, 7719, 2893, 9081, 8170, 5583, 2792, 9717, 9029, 2629,
    7823, 3683, 8985, 1946, 952,
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
    pixelAttributes += loadPixels.includes(i) ? "1" : "0";
    pixelAttributes += structuralPixels.includes(i) ? "1" : "0";
    pixelAttributes += queenPixels.includes(i) ? "1" : "0";
  }

  msg.innerText = pixelAttributes;
}
