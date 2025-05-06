export const validateMobile = (mobileNumber: string) => {
  const mobileRegex = /^[0-9]{3}[-\s]?[0-9]{3}[-\s]?[0-9]{4}$/;
  return mobileRegex.test(mobileNumber);
};

export const validateStringOnly = (name: string) => {
  // Check if the name contains any digit
  const digitRegex = /\d/;
  return !digitRegex.test(name);
};

export const validateEmail = (email: any) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUrl = (link: string): boolean => {
  // Regular expression for validating a general URL pattern
  const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?([/?].*)?$/;

  // Check if the link matches the URL pattern
  return urlRegex.test(link.trim());
};


export const validateFacebookUrl = (link: string) => {
  // Regular expression for a basic URL pattern
  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com)\/(?:[a-zA-Z0-9_.]{1,50})/i;
  const urlRegex1 =
    /^(www\.)?(?:facebook\.com)\/(?:[a-zA-Z0-9_.]{1,50})/i;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link);
};

export const validateXUrl = (link: string) => {
  // Regular expression for a basic URL pattern
  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:x\.com)\/(?:[a-zA-Z0-9_.]{1,50})/i;
  const urlRegex1 =
    /^(www\.)?(?:x\.com)\/(?:[a-zA-Z0-9_.]{1,50})/i;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link);
};

export const validateTwitterUrl = (link: string) => {
  // Regular expression for Twitter URL pattern
  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:x\.com)\/(?:[a-zA-Z0-9_]{1,15})/i;
  const urlRegex1 =
    /^(www\.)?(?:x\.com)\/(?:[a-zA-Z0-9_]{1,15})/i;
  const urlRegex2 =
    /^(www\.)?(?:x\.com)\/(?:[a-zA-Z0-9_]{1,15})/i;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link) || urlRegex2;
};

export const validateYouTubeUrl = (link: string) => {
  // Regular expression for YouTube URL pattern

  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)(\/(?:watch\?v=)?[a-zA-Z0-9_-]{11}|\/[a-zA-Z0-9_-]+)?$/i;
  const urlRegexChannelId = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/[a-zA-Z0-9_-]+$/i;
  const urlRegexCustomName = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/c\/[a-zA-Z0-9_-]+$/i;
  const urlRegexUser = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/user\/[a-zA-Z0-9_-]+$/i;
  const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/?.*$/;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegexChannelId.test(link) || urlRegexCustomName.test(link) || urlRegexUser.test(link) || youtubeRegex.test(link);
};

export const validateTikTokUrl = (link: string) => {
  // Regular expression for TikTok URL pattern
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[a-zA-Z0-9._]+\/video\/\d{19}/i;
  const urlRegex1 = /^(www\.)?tiktok\.com\/@[a-zA-Z0-9._]+\/video\/\d{19}/i;
  const urlRegex2 = /^https?:\/\/(www\.)?tiktok\.com\//.test(link);
  const urlRegex3 = /^(www\.)?tiktok\.com\//.test(link);
  // export const validateTikTokUrl = (link: string) => {
  //   return /^https?:\/\/(www\.)?tiktok\.com\//.test(link);
  // };
  
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link) || urlRegex2  || urlRegex3;
};



export const validateInstagramUrl = (link: string) => {
  // Regular expression for a basic URL pattern
  // const urlRegex = /^\s*(http\:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/i;
  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?)/i;
  const urlRegex1 =
    /^(www\.)?(?:instagram\.com|instagr\.am)\/(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_.]{0,28}[a-zA-Z0-9_])?)/i;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link);
};

export const validateLinkedInUrl = (link: string) => {
  // Regular expression for a basic URL pattern
  const urlRegex =
    /^(?:https?:\/\/)?(?:([a-z]{2}| ?www)\.)?(?:linkedin\.com)\/(?:[a-zA-Z0-9_-]+)/i;
  const urlRegex1 =
    /^(?:([a-z]{2}| ?:www)\.)?(?:linkedin\.com)\/(?:[a-zA-Z0-9_-]+)/i;
  // Check if the link matches the URL pattern
  return urlRegex.test(link) || urlRegex1.test(link);
};

export const validateEmailV2 = (email: any) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};