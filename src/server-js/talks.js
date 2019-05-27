module.exports = {
	current: [
		{
			title: "Houston, we have an Exception",
			year: 2018,
			link: "https://www.youtube.com/watch?v=WIf582XYm-w",
			img: "/img/talks/whose-error.jpg",
			paragraphs: [
				"When we program, we normally focus on the happy path, resolving the task at hand and assuming that nothing can wrong go. Sadly, anything that can fail, will fail. When we sign up the username will be already in use. We will lose connection. When we call our API we'll get a 500 error or timeout, and the user will make a mistake filling the forms.",
				"So what constitutes an error? How can we avoid them or at least rest assured that they are being handled? In this talk, we'll see how we can use TypeScript to answer those questions and make our life's easier."
			]
		},
		{
			title: "TypeScript can do that?",
			year: 2018,
			link: "https://www.youtube.com/watch?v=56s94hJBs1Q",
			img: "/img/talks/typescript_can_do_that.jpg",
			paragraphs: [
				"TypeScript is not a new language, is a way to type JavaScript. But given the dynamic nature of JS and the fact that it's a multi-paradigm language some challenges arise. In this talk, we'll see some of the newest TypeScript features that helps cope with this problem.",
				"We'll also see how Functional Programming relates to Object Oriented Programming and why learning one will make us better in the other."
			]
		},
		{
			title: "Defensive programming in Node with PureScript",
			year: 2018,
			link: "https://www.youtube.com/watch?v=TCLo7D-acBI",
			img: "/img/talks/defensive-ps.jpg",
			paragraphs: [
				`When we program, our first intuition is to resolve "the happy path", do the task at hand assuming that everything works as expected, nothing fails. But sadly, "all software is broken" and in general, the bugs are not in the happy path. We need to program defensively!.`,
				"In this talk we'll see a proof of concept of a console tool made both in JavaScript and in PureScript, concentrating in all the different things that can go wrong, trying to catch all errors so that no bug is left behind."
			]
		},
	],
	past: [
		{
			title: "Code is Data and viceversa",
			year: 2016,
			link: "https://www.youtube.com/watch?v=DKliwV3QdnU",
			img: "/img/talks/code_is_data.jpg",
			paragraphs: [
				`A program is not that different to the data it uses. Aren't it all ones and zeroes?. In this talk we'll see what this concept means and some places it appears. Security holes, typed languages and the ever lasting battle between explicit and implicit code.`,
				`Join me and let's see this patterns that are present even though we don't always think of them.`
			]
		},
		{
			title: "What is TypeScript",
			year: 2016,
			link: "https://www.youtube.com/watch?v=W8zpuxuGlqU",
			img: "/img/talks/what_is_typescript.jpg",
			paragraphs: [
				`Writting JavaScript that scales can be daunting, luckly we can use a static checker that help us with some of the common bugs.`,
				"In this talk we'll see what is TypeScript, and how we can add it to our project without dying in the process."
			]
		},
		{
			title: "El zen de Angular",
			year: 2015,
			link: "https://www.youtube.com/watch?v=G6m2X5pOevg",
			img: "/img/talks/angular_zen.jpg",
			paragraphs: [
				`In this talk we'll analyze what Angular defines as it's zen. We'll see the differences between an imperative and a declarative way of programming in the web and other technologies.`,
				`Lastly, we'll see how we apply this concepts to build the video player at Acamica`,
			]
		},
	]
};