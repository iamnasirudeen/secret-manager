import { Request } from "express";

interface IReq extends Request {
  user?: {
    id?: string;
  };
}

export { IReq };
