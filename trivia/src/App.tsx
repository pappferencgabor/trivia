import { useCookies } from "react-cookie"
import CookieConsent from "./components/cookie-consent/CookieConsent"

function App() {
    const [cookie] = useCookies(['cookie_consent'])

	return (
		<div>
			{/* {!cookie.cookie_consent && <CookieConsent />} */}
			{!cookie.cookie_consent ? <CookieConsent /> : <></>}
		</div>
	)
}

export default App
