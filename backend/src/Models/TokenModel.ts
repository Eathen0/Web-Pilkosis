import BaseModel from "./Main/BaseModels";

class TokenModel extends BaseModel {
    protected tableName: string = "tokens"
    protected primaryKey: string = "id"

}

export default TokenModel;