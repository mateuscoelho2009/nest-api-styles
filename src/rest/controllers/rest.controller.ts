import { Controller, Get } from '@nestjs/common';
import { RESOURCES_METADATA } from '../utils/utils';

@Controller('rest')
export class RESTController {
  @Get()
  async getResourceList() {
    return RESOURCES_METADATA;
  }
}
