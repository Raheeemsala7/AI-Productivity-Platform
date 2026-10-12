import { IPagination } from '../../../features/exams/types/exam';


declare type SuccessResponse<T> = {
    status: true
    code: number;
    message?: string
    payload: T
}
declare type ErrorResponse = {
    status: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type IApiResponse<T> = SuccessResponse<T> | ErrorResponse

declare type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; message: string };


// declare interface IPagination<T> {
//     data: T[];
//     metadata: {
//         current_page: number
//         last_page: number
//         next_page: null
//         per_page: number
//         prev_page: null
//         total: number
//     };
// }


declare interface IMetadata {
    current_page: number
    last_page: number
    next_page: number | null
    per_page: number
    prev_page: number | null
    total: number
};

declare interface IPagination<T> {
    data: T[];
    metadata?: IMetadata;
    meta?: IMetadata;
    pagination?: IMetadata;
    current_page?: number;
    last_page?: number;
    next_page?: number | null;
    per_page?: number;
    prev_page?: number | null;
    total?: number;
}

export interface ITimeStamp {
    createdAt: string;
    updatedAt: string;
}

export interface IResponseMessage {
    message: string
}




declare type ISuccessResponse<T> = {
    success: true
    code: number;
    message?: string
    payload: T
}
declare type IErrorResponse = {
    success: false
    code: number;
    message?: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

declare type ApiResponse<T> = ISuccessResponse<T> | IErrorResponse