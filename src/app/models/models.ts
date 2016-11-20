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

export class User {
    user_id: number;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
}

export class Credit {
    credit_id: number;
    movie_id: number;
    name: string;
    is_crew_member: Boolean;
    is_cast_member: Boolean;
}

export class CrewMember extends Credit {
    job: string;
}

export class CastMember extends Credit {
    role: string;
}