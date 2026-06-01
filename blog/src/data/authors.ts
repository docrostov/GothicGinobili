export interface AuthorData {
	bio: string;
	photo?: string;
	socials?: { label: string; url: string }[];
}

export const AUTHORS: Record<string, AuthorData> = {
	'aaron-mcguire': {
		bio: 'Founder of this blog and one of the original blog boys. Statistician from Richmond, VA. Honestly, really happy you\'re reading this. Yes, you!',
		photo: '/images/authors/aaron-mcguire.webp',
		socials: [
			{ label: 'Bluesky', url: 'https://bsky.app/profile/docrostov.bsky.social' },
			{ label: 'Twitter', url: 'https://twitter.com/docrostov' },
		],
	},
	'alex-dewey': {
		bio: 'World-famous Joke Calculator, and beloved friend. One of the co-founders of this blog.',
		photo: '/images/authors/alex-dewey.webp',
		socials: [
			{ label: 'Bluesky', url: 'https://bsky.app/profile/dewno.bsky.social' },
			{ label: 'Twitter', url: 'https://twitter.com/DewNO' },
		],
	},
	'alex-arnon': {
		bio: 'Unflinchingly cool city slicker in a gaggle of small market nerds. Gave Aaron his first-ever tequila shot.',
		photo: '/images/authors/alex-arnon.jpg',
	},
	'adam-koscielak': {
		bio: 'A Polish-Canadian Lawyer in King Arthur\'s Court. Every time someone talks about a Gortat screen, Adam hears you.',
		photo: '/images/authors/adam-koscielak.jpg',
		socials: [
			{ label: 'Twitter', url: 'https://twitter.com/TheBeardedPole' },
		],
	},
	'jacob-harmon': {
		bio: 'Russell Westbrook\'s most powerful fan, and Kevin Durant\'s most powerful hater. Lovely guy.',
		photo: '/images/authors/jacob-harmon.jpg',
		socials: [
			{ label: 'Twitter', url: 'https://twitter.com/morphingmandrel' },
		],
	},
	'john-hugar': {
		bio: 'A broadly successful writer with bylines at AV Club, Uproxx, and Vice Sports. Hooray for John!',
		photo: '/images/authors/john-hugar.jpeg',
		socials: [
			{ label: 'Twitter', url: 'https://twitter.com/thejohnhugar' },
		],
	},
	'cesar-r': {
		bio: 'One of my old pals who wrote a nice little piece for the blog back in the day. Hi, Cesar!',
		photo: '/images/authors/cesar-r.png',
		socials: [
			{ label: 'Twitter', url: 'https://x.com/BigC927' },
		],
	},
};
