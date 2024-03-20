// VideoUtills.js
import { formatDistanceToNow } from 'date-fns';

// export const thumbnail_size = { width: 2048, height: 1152 }; // for high resolution
export const THUMB_SIZE = { width: 1280, height: 720 };

export const VIEW_COUNT = (count) => {
    if (count < 1000) {
        return count.toString();
    } else if (count < 1000000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else {
        return `${(count / 1000000).toFixed(1)}M`;
    }
};


export const TimeAgo = ({ date }) => {
    // Assuming `date` is a string in the format 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const parsedDate = new Date(date);

    const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

    return <span>{timeAgo}</span>;
};


export const formatViewsCount = (count) => {
    if (count < 1000) {
        return count.toString();
    } else if (count < 1000000) {
        return `${(count / 1000).toFixed(1)}K`;
    } else {
        return `${(count / 1000000).toFixed(1)}M`;
    }
};
