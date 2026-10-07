import {
  Home,
  Trees,
  UserRound,
  Info,
  FileText,
  Users,
  LucideIcon,
} from 'lucide-react'

import { PAGE_PATHS } from './paths'

type SidebarItems = {
  key: string
  name: string
  icon: LucideIcon
  path: string
  matchPattern: string
  adminOnly?: boolean
}

export const sidebarItems = Object.freeze<SidebarItems[]>([
  {
    key: 'home',
    name: 'Início',
    icon: Home,
    path: PAGE_PATHS.HOME,
    matchPattern: '^/$',
  },
  {
    key: 'properties',
    name: 'Propriedades',
    icon: Trees,
    path: PAGE_PATHS.PROPERTIES,
    matchPattern: '^/properties(/.*)?$',
  },
  {
    key: 'producers',
    name: 'Produtores',
    icon: UserRound,
    path: PAGE_PATHS.PRODUCERS,
    matchPattern: '^/producers(/.*)?$',
  },
  {
    key: 'generalRegistrations',
    name: 'Cadastros Gerais',
    icon: Info,
    path: PAGE_PATHS.GENERAL_REGISTRATIONS,
    matchPattern: '^/general-registrations(/.*)?$',
  },
  {
    key: 'reports',
    name: 'Relatórios',
    icon: FileText,
    path: PAGE_PATHS.REPORTS,
    matchPattern: '^/reports(/.*)?$',
  },
  {
    key: 'users',
    name: 'Usuários',
    icon: Users,
    path: PAGE_PATHS.USERS,
    matchPattern: '^/users(/.*)?$',
    adminOnly: true,
  },
])
