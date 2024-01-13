import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // review 작성 api
  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewsService.createReview(createReviewDto);
  }

  // review 전체 조회 api
  @Get()
  async getAllReviews() {
    return await this.reviewsService.getAllReviews();
  }

  // 특정 review 조회 api
  @Get(':id')
  async getReview(@Body('id') id: string) {
    return await this.reviewsService.getReview(id);
  }

  // 특정 review 수정 api
  @Patch(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.updateReview(id, updateReviewDto);
  }

  // 특정 review 삭제 api
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return await this.reviewsService.deleteReview(id);
  }
}
