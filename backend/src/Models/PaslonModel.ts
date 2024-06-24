import BaseModel from "./Main/BaseModels";

class UserModel extends BaseModel {
    protected tableName: string = "calon"
    protected primaryKey: string = "id"
}

export default UserModel;