import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { boardsService } from '../services/BoardsService'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.findById)
      .post('', this.createBoard)
      .delete('/:id', this.deleteBoard)
  }

  async getAll(req, res, next) {
    try {
      // req.body.creatorId = req.userInfo.id
      const data = await boardsService.getAll(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findById(req, res, next) {
    try {
      const data = await boardsService.findById({ _id: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await boardsService.createBoard(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async deleteBoard(req, res, next) {
    try {
      const data = await boardsService.deleteBoard({ _id: req.params.id })
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
