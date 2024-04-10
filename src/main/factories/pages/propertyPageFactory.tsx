import { PropertyPage } from '@/presentation/pages/property'

import { makeRemoteGetProperties } from '../useCases/property'

export const MakePropertyPage: React.FC = () => (
	<PropertyPage getProperties={makeRemoteGetProperties()} />
)
