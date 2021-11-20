import { PictureSize, Reaction } from '@/types/common';

export const REACTION_PICTURE_PATH_MAPS: Record<Reaction, PictureSize> = {
  like: {
    normal: '/images/like.png',
    mini: '/images/like-50.png',
  },
  celebrate: {
    normal: '/images/celebrate.png',
    mini: '/images/celebrate-50.png',
  },
  love: {
    normal: '/images/love.png',
    mini: '/images/love-50.png',
  },
  insightful: {
    normal: '/images/insightful.png',
    mini: '/images/insightful-50.png',
  },
  curious: {
    normal: '/images/curious.png',
    mini: '/images/curious-50.png',
  },
};

export const CANVAS_WIDTH = 640;
export const CANVAS_HEIGHT = 360;

export const POLL_DEFAULT_TITLE = 'Poll Title';
