// ShareUtills.js

import { APP_URL } from "@/app/lib/auth/config";

export const SHARE_LONG = (uniqId, title, description) => {
  // alert(uniqId);
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: description,
        url: APP_URL + "watch/" + uniqId,
      })
      .then(() => {
        // console.log('Shared successfully');
      })
      .catch((error) => {
        // console.error('Error sharing:', error);
      });
  } else {
    // console.log('Web Share API not supported');
  }
};

export const SHARE_SHORTS = (uniqId, title, description) => {
  // alert(uniqId);
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: description,
        url: APP_URL + "shorts/" + uniqId,
      })
      .then(() => {
        // console.log('Shared successfully');
      })
      .catch((error) => {
        // console.error('Error sharing:', error);
      });
  } else {
    // console.log('Web Share API not supported');
  }
};
