import Link from 'next/link'
import React from 'react'

function Header() {
	return (
		<header className='flex justify-between p-5'>
			<div className='flex items-center space-x-5'>
				<Link href='/'>
					<img className='w-44 object-contain cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Medium_logo_Wordmark_Black.svg/1280px-Medium_logo_Wordmark_Black.svg.png" alt="Next.js Medium Logo" />
				</Link>
				<div className='hidden md:inline-flex items-center space-x-5'>
					<Link href='/about'>
						<h3>About</h3>
					</Link>
					<Link href='/contact'>
						<h3>Contact</h3>
					</Link>
					<Link href='/follow'>
						<h3 className='text-white bg-green-600 py-1 px-4 rounded-full'>Follow</h3>
					</Link>
				</div>
			</div>
			<div className='flex items-center space-x-5 text-green-600'>
				<Link href='/login'>
					<h3>Sign In</h3>
				</Link>
				<Link href='/get-started'>
					<h3 className='border border-green-600 py-1 px-4 rounded-full'>Get Started</h3>
				</Link>

			</div>
		</header>
	)
}

export default Header