import { Controller, Get, Post } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
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
