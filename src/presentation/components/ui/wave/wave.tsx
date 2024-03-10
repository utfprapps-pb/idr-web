import React from 'react'

import { cn } from '@/main/utils'
import { useWindowResize } from '@/presentation/hooks/useWindowResize'

type WaveProps = React.HTMLAttributes<HTMLDivElement>

const Wave: React.FC<WaveProps> = ({ className, ...props }) => {
	const { width } = useWindowResize()

	return (
		<div className={cn(className, 'flex w-full')} {...props}>
			<svg viewBox="0 0 1440 206" width={`${width}px`} fill="none">
				<path
					d="M0 11.0392C0 7.17321 3.13401 4.03922 7 4.03922L1433 4.03922C1436.87 4.03922 1440 7.17322 1440 11.0392V166.021C1440 171.56 1433.87 174.905 1429.21 171.909L1359.98 127.382C1301.88 90.0188 1232.08 75.2794 1163.84 85.96L665.217 163.996L650.632 166.029C460.029 192.601 267.137 198.779 75.2241 184.459L6.47912 179.329C2.82535 179.056 0 176.012 0 172.348L0 11.0392Z"
					fill="url(#green-gradient)"
				/>

				<path
					d="M-7 6.99999C-7 3.134 -3.86599 0 4.17955e-08 0H1440C1443.87 0 1447 3.13401 1447 7V109.355C1447 114.403 1441.82 117.791 1437.19 115.768L1343.64 74.8433C1298.74 55.2042 1249.5 47.6038 1200.77 52.791L664.685 109.858L556.589 120.108C426.003 132.491 294.69 135.369 163.687 128.72L-0.354821 120.394C-4.07811 120.205 -7 117.131 -7 113.403V6.99999Z"
					fill="url(#blue-gradient)"
				/>
				<defs>
					<linearGradient
						id="green-gradient"
						x1="1200.55"
						y1="73.7127"
						x2="1141.6"
						y2="256.683"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0.00282221" stopColor="#61BB46" />
						<stop offset="1" stopColor="#00854A" />
					</linearGradient>
					<linearGradient
						id="blue-gradient"
						x1="1239.1"
						y1="46.5398"
						x2="1172.48"
						y2="326.03"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#0081C9" />
						<stop offset="1" stopColor="#0059AA" />
						<stop offset="1" stopColor="#0059AA" />
					</linearGradient>
				</defs>
			</svg>{' '}
		</div>
	)
}
Wave.displayName = 'Wave'

export { Wave }
