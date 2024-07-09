import crypto from "node:crypto";

// Generate Random Token for Email Verification
export const generateRandomToken = async () => {
  const randomBytes = await Promise.resolve(crypto.randomBytes(20));
  const token = randomBytes.toString("hex");
  return token;
};

// Profile Picture Collection
let profileImageNameList = [
  "Jasper",
  "Nala",
  "Sammy",
  "Harley",
  "Lucy",
  "Bob",
  "Snuggles",
  "Patches",
  "Tiger",
  "Smokey",
  "Leo",
  "Snickers",
  "Oliver",
  "Annie",
  "Socks",
  "Coco",
  "Buddy",
  "Chloe",
  "Callie",
  "Buster",
];

// Profile Picture Collection List
let profileImageCollectionList = [
  "adventurer-neutral",
  "fun-emoji",
  "lorelei-neutral",
  "avataaars-neutral",
  "big-ears-neutral",
  "bottts-neutral",
  "notionists-neutral",
  "pixel-art-neutral",
];

// Generates random profile picture
export const generateRandomAvatar = () => `
https://api.dicebear.com/6.x/${
  profileImageCollectionList[
    Math.floor(Math.random() * profileImageCollectionList.length)
  ]
}/svg?seed=
${profileImageNameList[Math.floor(Math.random() * profileImageNameList.length)]}
`;

// Adds expiry time for email verification
export const addExpiryHours = () => {
  let currentTime = new Date();
  let futureTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
  return futureTime;
};
