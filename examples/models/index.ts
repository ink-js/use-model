import { createModels } from '../../source'
import user from './user'

const hooks = { user }

export const { Provider, useModel } = createModels(hooks)
