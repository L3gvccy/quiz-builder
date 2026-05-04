export const HOST = import.meta.env.VITE_SERVER_URL;

export const QUIZZES_URL = `${HOST}/quizzes`;
export const GET_QUIZ_URL = (id: string) => `${QUIZZES_URL}/${id}`;
export const DELETE_QUIZ_URL = (id: string) => `${QUIZZES_URL}/${id}`;
