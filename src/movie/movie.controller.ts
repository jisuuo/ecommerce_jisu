import { Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async registerMovies() {
    return await this.movieService.registerMovies();
  }

  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }
}
