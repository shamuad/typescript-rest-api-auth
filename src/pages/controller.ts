// src/pages/controller.ts
import { 
  JsonController, 
  Get, 
  Put, 
  Body, 
  Param, 
  Post, 
  HttpCode, 
  NotFoundError,
  Authorized
} from 'routing-controllers'
import Page from './entity'

@JsonController()
export default class PageController {

    @Get('/pages/:id')
    getPage(
        @Param('id') id: number
    ) {
        return Page.findOne(id)
    }

    // @Get('/pages/:id')
    // async getPage(
    //     @Param('id') id: number
    // ): Promise<Page | undefined> {
    //     const page = await Page.findOne(id)
    //     return page
    // }

    @Get('/pages')
    async allPages() {
      const pages = await Page.find()
      return { pages }
    }

    // @Get('/pages')
    // allPages(): PageList { 

    //     return { pages : Object.keys(pagesById).map(item => pagesById[item]) }
    // }

    @Authorized()
    @Put('/pages/:id')
    async updatePage(
        @Param('id') id: number,
        @Body() update: Partial<Page>
    ) {
        const page = await Page.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')

        return Page.merge(page, update).save()
    }

    // @Put('/pages/:id')
    // updatePage(
    //     @Param('id') id: number,
    //     @Body() body: Partial<Page>
    // ): Page {
    //     console.log(`Incoming PUT body param:`, body)
    //     return pagesById[id]
    // }

    @Authorized()
    @Post('/pages')
    @HttpCode(201)
    createPage(
      @Body() page: Page
    ) {
      return page.save()
    }

    // @Post('/pages')
    // @HttpCode(201)
    // createPage(
    //     @Body() body: Page
    // ): Page {
    //     console.log(`Incoming POST body param:`, body)
    //     return body
    // }
}