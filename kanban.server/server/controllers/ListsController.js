import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { listsService } from '../services/ListsService'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/lists', this.findByBoardId)
      .get('/:id', this.findById)
      .post('', this.createList)
      .delete('/:id', this.deleteList)
  }

  async getAll(req, res, next) {
    try {
      // req.body.creatorId = req.userInfo.id
      const data = await listsService.getAll(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findById(req, res, next) {
    try {
      const data = await listsService.findById({ _id: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findByBoardId(req, res, next) {
    try {
      const data = await listsService.findByBoardId({ _id: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createList(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await listsService.createList(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteList(req, res, next) {
    try {
      const data = await listsService.deleteList({ _id: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
