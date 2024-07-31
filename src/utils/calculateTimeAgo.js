export const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const createdDate = new Date(createdAt);

    const diffInSeconds = Math.floor((now - createdDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) return `Hace ${diffInYears} año${diffInYears > 1 ? 's' : ''} atrás`;
    if (diffInMonths > 0) return `Hace ${diffInMonths} mes${diffInMonths > 1 ? 'es' : ''} atrás`;
    if (diffInDays > 0) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''} atrás`;
    if (diffInHours > 0) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''} atrás`;
    if (diffInMinutes > 0) return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''} atrás`;
    return `Hace ${diffInSeconds} segundo${diffInSeconds > 1 ? 's' : ''} atrás`;
};