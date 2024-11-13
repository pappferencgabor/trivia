import { useCookies } from "react-cookie"
import CookieConsent from "./components/cookie-consent/CookieConsent"
import { useEffect, useState } from "react"
import { getTrivia } from "./services/TriviaService"
import TriviaQuestion from "./components/trivia-question/TriviaQuestion"

export type TriviaType = {
	type: string, 
	difficulty: string, 
	category: string, 
	question: string, 
	correct_answer: string, 
	incorrect_answers: string[]
}

function App() {
    const [cookie] = useCookies(['cookie_consent'])
	const [triviaQuestions, setTrivia] = useState<TriviaType[]>([])
	const [triviaIdx, setTriviaIdx] = useState(0)

	useEffect(() => {
		getTrivia().then(data => setTrivia(data.results))
	}, [])

	const nextQuestion = () => {
		if (triviaQuestions.length - 1 > triviaIdx) {
			setTriviaIdx(triviaIdx => triviaIdx + 1)
		}
	}

	return (
		<div>
			{
				triviaQuestions.length > 0 ? 
				<TriviaQuestion 
					trivia={triviaQuestions[triviaIdx]}
					nextQuestion={nextQuestion}/> :
				<></>
			}


			{/* {!cookie.cookie_consent && <CookieConsent />} */}
			{!cookie.cookie_consent ? <CookieConsent /> : <></>}
		</div>
	)
}

export default App
