import { NextFunction } from 'express'

function TokenMiddleware(res, req, next: NextFunction) {

    next()
}

export default TokenMiddleware