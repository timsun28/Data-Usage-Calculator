import Head from 'next/head'

export default function Home() {
	const gbAvailable = 40;
	const getRemainingData = () => {
		const today = new Date()
		const currentDate = today.getDate();
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
		const mbAvailable = gbAvailable * 1000;
		const mbPerDay = mbAvailable / lastDayOfMonth;
		const mbLeft = Math.round(mbAvailable - mbPerDay * currentDate) || 0;
		function numberWithCommas(x: number) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return numberWithCommas(mbLeft)
	}

	const getPerDayData = () => {
		const today = new Date()
		const mbAvailable = gbAvailable * 1000;
		const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
		const mbPerDay = mbAvailable / lastDayOfMonth;
		return Math.round(mbPerDay)
	}
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<Head>
				<title>Data Usage</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center md:justify-center w-full flex-1 px-4 bg-white dark:bg-gray-900">
				<h1 className="text-6xl md:text-7xl font-bold flex flex-col dark:text-white">
					<div>
						You have <span className='text-gradient first text-8xl'>{getRemainingData()}</span> MB left with
					</div>
					<div>
						<span className='text-gradient second text-8xl'>{getPerDayData()}</span> MB available per day
					</div>
				</h1>
			</main>
		</div>
	)
}
