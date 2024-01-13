import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Reivew')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
}
