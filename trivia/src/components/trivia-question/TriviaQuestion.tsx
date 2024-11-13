import React, { useEffect, useState } from "react"
import { TriviaType } from "../../App"
import styles from "./TriviaQuestion.module.css"

const TriviaQuestion = (props: {
        trivia: TriviaType, 
        nextQuestion: () => void
    }) => {
    const [answers, setAnswers] =  useState<string[]>([])

    const [selected, setSelected] = useState<string | undefined>()

    useEffect(() => {
        setSelected(undefined)
        let temp = [...props.trivia.incorrect_answers, props.trivia.correct_answer]
        temp.sort();
        setAnswers(temp)
    }, [props])

    const testAnswer = () => {
        if (selected === props.trivia.correct_answer) {
            return <h1 className={styles.result}>Helyes</h1>
        }
        else {
            return <h1 className={styles.result}>Helytelen</h1>
        }
    }

    useEffect(() => {
        if (selected) {
            setTimeout(props.nextQuestion, 2000)
        }
    }, [selected])

    return (
        <section className={styles.triviaQuestion}>
            <h1 dangerouslySetInnerHTML={{ __html: props.trivia.question }}></h1>

            {
                answers.map( answer => <button onClick={() => setSelected(answer)} dangerouslySetInnerHTML={{ __html: answer }}></button>)
            }

            {
                selected ? testAnswer() : <></>
            }
        </section>
    )
}

export default TriviaQuestion