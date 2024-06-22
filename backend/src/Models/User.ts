import BaseModel from "./Main/BaseModels";

class UserModel extends BaseModel {
    protected tableName: string = "siswa"
    protected primaryKey: string = "id"

}

export default UserModel;