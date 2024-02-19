import { Optional } from "@nestjs/common";

export class PaginationDto {
    @Optional()
    readonly limit: number;
    @Optional()
    readonly offset: number;
}