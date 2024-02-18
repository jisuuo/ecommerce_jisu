import { Controller, Get, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../common/dtos/page-options.dto';
import { PageDto } from '../common/dtos/page.dto';
import { Movie } from './entites/movie.entity';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async registerMovies() {
    return await this.movieService.registerMovies();
  }

  @Get()
  async getAllMovies(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Movie>> {
    return await this.movieService.getAllMovies(pageOptionsDto);
  }
}
