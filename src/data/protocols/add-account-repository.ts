import { AccountModel, AddAccountModel } from '../usecases/add-account/ad-add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
