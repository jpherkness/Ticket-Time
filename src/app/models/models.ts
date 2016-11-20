export class Movie {
    movie_id: number;
    title: string;
    description: string;
    release_date: string;
    runtime: number;
    rating: number;
    poster_url?: string;
    backdrop_url?: string;
}

export class Reservation {
    reservation_id: number;
    user_id: number;
    showtime_id: number;
    quantity: number;
}

export class Showtime {
    showtime_id: number;
    movie_id: string;
    time: string;
    max_capacity: number;
    current_capacity?: number;
}