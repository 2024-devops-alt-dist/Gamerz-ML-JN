export const formatMessageTime = (createdAt: string | number | Date, currentTime: Date = new Date()) => {
    const messageDate = new Date(createdAt);
    const diffInMinutes = Math.floor((currentTime.getTime() - messageDate.getTime()) / (1000 * 60));

    if(diffInMinutes < 1) {
        return 'now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 24 * 60) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
        return messageDate.toLocaleString();
    }
};